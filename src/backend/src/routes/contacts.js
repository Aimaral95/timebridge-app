const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts for current user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: contacts, error } = await supabase
      .from('contacts')
      .select(`
        *,
        contact:contact_user_id (
          id,
          name,
          email,
          phone,
          city,
          country,
          timezone,
          avatar_url,
          last_seen
        ),
        user_status!contact_user_id (
          status,
          quiet_hours_start,
          quiet_hours_end
        ),
        privacy_settings!privacy_settings_user_id_fkey (
          share_time_weather,
          share_availability,
          share_schedule
        )
      `)
      .or(`user_id.eq.${userId},contact_user_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }

    res.json({ contacts });

  } catch (error) {
    logger.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   POST /api/contacts
 * @desc    Send contact request
 * @access  Private
 */
router.post('/',
  [
    body('email').optional().isEmail(),
    body('phone').optional(),
    body('name').optional()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { email, phone, name } = req.body;

      if (!email && !phone) {
        return res.status(400).json({ error: 'Email or phone is required' });
      }

      // Find the contact user
      let query = supabase.from('users').select('*');
      
      if (email) {
        query = query.eq('email', email);
      } else {
        query = query.eq('phone', phone);
      }

      const { data: contactUser, error: findError } = await query.single();

      if (findError || !contactUser) {
        // If user doesn't exist, we could send an invitation
        return res.status(404).json({ 
          error: 'User not found',
          message: 'This user is not registered on timeBridge yet'
        });
      }

      // Check if contact already exists
      const { data: existing } = await supabase
        .from('contacts')
        .select('*')
        .or(`and(user_id.eq.${userId},contact_user_id.eq.${contactUser.id}),and(user_id.eq.${contactUser.id},contact_user_id.eq.${userId})`)
        .single();

      if (existing) {
        return res.status(400).json({ 
          error: 'Contact request already exists',
          status: existing.status
        });
      }

      // Create contact request
      const { data: contact, error: createError } = await supabase
        .from('contacts')
        .insert({
          user_id: userId,
          contact_user_id: contactUser.id,
          status: 'pending'
        })
        .select()
        .single();

      if (createError) {
        logger.error('Error creating contact:', createError);
        return res.status(500).json({ error: 'Failed to create contact request' });
      }

      // Create default privacy settings
      await supabase.from('privacy_settings').insert({
        user_id: userId,
        contact_user_id: contactUser.id,
        share_time_weather: true,
        share_availability: true,
        share_schedule: false
      });

      // Send notification via Socket.IO
      const io = req.app.get('io');
      io.to(`user-${contactUser.id}`).emit('contact-request', {
        from: req.user.name,
        contactId: contact.id
      });

      // Create notification
      await supabase.from('notifications').insert({
        user_id: contactUser.id,
        type: 'contact_request',
        title: 'New Contact Request',
        message: `${req.user.name} wants to connect with you`,
        data: { contact_id: contact.id }
      });

      res.status(201).json({
        message: 'Contact request sent successfully',
        contact
      });

    } catch (error) {
      logger.error('Error creating contact:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   PATCH /api/contacts/:id/status
 * @desc    Accept or reject contact request
 * @access  Private
 */
router.patch('/:id/status',
  [
    body('status').isIn(['accepted', 'rejected', 'blocked']).withMessage('Invalid status')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { id } = req.params;
      const { status } = req.body;

      // Update contact status
      const { data: contact, error } = await supabase
        .from('contacts')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('contact_user_id', userId)
        .select(`
          *,
          contact:user_id (name, id)
        `)
        .single();

      if (error) {
        logger.error('Error updating contact:', error);
        return res.status(500).json({ error: 'Failed to update contact' });
      }

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      // If accepted, create reciprocal privacy settings
      if (status === 'accepted') {
        await supabase.from('privacy_settings').insert({
          user_id: userId,
          contact_user_id: contact.user_id,
          share_time_weather: true,
          share_availability: true,
          share_schedule: false
        });

        // Notify the requester
        const io = req.app.get('io');
        io.to(`user-${contact.user_id}`).emit('contact-accepted', {
          by: req.user.name,
          contactId: id
        });

        await supabase.from('notifications').insert({
          user_id: contact.user_id,
          type: 'contact_accepted',
          title: 'Contact Request Accepted',
          message: `${req.user.name} accepted your contact request`,
          data: { contact_id: id }
        });
      }

      res.json({
        message: `Contact ${status} successfully`,
        contact
      });

    } catch (error) {
      logger.error('Error updating contact status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Remove a contact
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
      .or(`user_id.eq.${userId},contact_user_id.eq.${userId}`);

    if (error) {
      logger.error('Error deleting contact:', error);
      return res.status(500).json({ error: 'Failed to delete contact' });
    }

    res.json({ message: 'Contact removed successfully' });

  } catch (error) {
    logger.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
