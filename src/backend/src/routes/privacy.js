const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/privacy/:contactId
 * @desc    Get privacy settings for a contact
 * @access  Private
 */
router.get('/:contactId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;

    const { data: settings, error } = await supabase
      .from('privacy_settings')
      .select('*')
      .eq('user_id', userId)
      .eq('contact_user_id', contactId)
      .single();

    if (error && error.code !== 'PGRST116') {
      logger.error('Error fetching privacy settings:', error);
      return res.status(500).json({ error: 'Failed to fetch privacy settings' });
    }

    // Return default settings if none exist
    const defaultSettings = {
      share_time_weather: true,
      share_availability: true,
      share_schedule: false
    };

    res.json({ settings: settings || defaultSettings });

  } catch (error) {
    logger.error('Error fetching privacy settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   PATCH /api/privacy/:contactId
 * @desc    Update privacy settings for a contact
 * @access  Private
 */
router.patch('/:contactId',
  [
    body('share_time_weather').optional().isBoolean(),
    body('share_availability').optional().isBoolean(),
    body('share_schedule').optional().isBoolean()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { contactId } = req.params;
      const { share_time_weather, share_availability, share_schedule } = req.body;

      // Verify they are contacts
      const { data: contact } = await supabase
        .from('contacts')
        .select('*')
        .or(`and(user_id.eq.${userId},contact_user_id.eq.${contactId}),and(user_id.eq.${contactId},contact_user_id.eq.${userId})`)
        .eq('status', 'accepted')
        .single();

      if (!contact) {
        return res.status(403).json({ error: 'Not authorized to set privacy for this user' });
      }

      const updates = {};
      if (share_time_weather !== undefined) updates.share_time_weather = share_time_weather;
      if (share_availability !== undefined) updates.share_availability = share_availability;
      if (share_schedule !== undefined) updates.share_schedule = share_schedule;

      const { data: settings, error } = await supabase
        .from('privacy_settings')
        .upsert({
          user_id: userId,
          contact_user_id: contactId,
          ...updates
        })
        .select()
        .single();

      if (error) {
        logger.error('Error updating privacy settings:', error);
        return res.status(500).json({ error: 'Failed to update privacy settings' });
      }

      res.json({
        message: 'Privacy settings updated successfully',
        settings
      });

    } catch (error) {
      logger.error('Error updating privacy settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
