const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        user_status (
          status,
          quiet_hours_start,
          quiet_hours_end
        )
      `)
      .eq('id', userId)
      .single();

    if (error) {
      logger.error('Error fetching profile:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    res.json({ user });

  } catch (error) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   PATCH /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.patch('/profile',
  [
    body('name').optional().trim().notEmpty(),
    body('city').optional().trim(),
    body('country').optional().trim(),
    body('timezone').optional().trim(),
    body('language').optional().isIn(['en', 'ru', 'tr', 'kz'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { name, city, country, timezone, language } = req.body;

      const updates = {};
      if (name) updates.name = name;
      if (city) updates.city = city;
      if (country) updates.country = country;
      if (timezone) updates.timezone = timezone;
      if (language) updates.language = language;

      const { data: user, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Failed to update profile' });
      }

      res.json({
        message: 'Profile updated successfully',
        user
      });

    } catch (error) {
      logger.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   PATCH /api/users/status
 * @desc    Update availability status
 * @access  Private
 */
router.patch('/status',
  [
    body('status').isIn(['Free', 'Busy', 'Sleeping', 'In Class']),
    body('quiet_hours_start').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('quiet_hours_end').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { status, quiet_hours_start, quiet_hours_end } = req.body;

      const updates = { status };
      if (quiet_hours_start !== undefined) updates.quiet_hours_start = quiet_hours_start;
      if (quiet_hours_end !== undefined) updates.quiet_hours_end = quiet_hours_end;

      const { data, error } = await supabase
        .from('user_status')
        .upsert({
          user_id: userId,
          ...updates
        })
        .select()
        .single();

      if (error) {
        logger.error('Error updating status:', error);
        return res.status(500).json({ error: 'Failed to update status' });
      }

      // Broadcast status update to contacts
      const io = req.app.get('io');
      
      // Get user's contacts
      const { data: contacts } = await supabase
        .from('contacts')
        .select('contact_user_id, user_id')
        .or(`user_id.eq.${userId},contact_user_id.eq.${userId}`)
        .eq('status', 'accepted');

      // Notify all contacts
      contacts?.forEach(contact => {
        const contactId = contact.user_id === userId ? contact.contact_user_id : contact.user_id;
        io.to(`user-${contactId}`).emit('status-changed', {
          userId,
          status: data.status
        });
      });

      res.json({
        message: 'Status updated successfully',
        status: data
      });

    } catch (error) {
      logger.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (only if in contacts)
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if they are contacts
    const { data: contact } = await supabase
      .from('contacts')
      .select('*')
      .or(`and(user_id.eq.${userId},contact_user_id.eq.${id}),and(user_id.eq.${id},contact_user_id.eq.${userId})`)
      .eq('status', 'accepted')
      .single();

    if (!contact) {
      return res.status(403).json({ error: 'Not authorized to view this user' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        phone,
        city,
        country,
        timezone,
        avatar_url,
        last_seen,
        user_status (
          status,
          quiet_hours_start,
          quiet_hours_end
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }

    res.json({ user });

  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
