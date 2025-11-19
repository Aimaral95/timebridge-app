const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/call-requests
 * @desc    Get all call requests for current user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: requests, error } = await supabase
      .from('call_requests')
      .select(`
        *,
        from_user:from_user_id (id, name, avatar_url, timezone),
        to_user:to_user_id (id, name, avatar_url, timezone)
      `)
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Error fetching call requests:', error);
      return res.status(500).json({ error: 'Failed to fetch call requests' });
    }

    res.json({ requests });

  } catch (error) {
    logger.error('Error fetching call requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   POST /api/call-requests
 * @desc    Create a new call request
 * @access  Private
 */
router.post('/',
  [
    body('to_user_id').isUUID().withMessage('Valid user ID is required'),
    body('platform').isIn(['WhatsApp', 'Instagram', 'Facebook', 'Phone', 'Video Call']),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('note').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { to_user_id, platform, message, note } = req.body;

      // Check if they are contacts
      const { data: contact } = await supabase
        .from('contacts')
        .select('*')
        .or(`and(user_id.eq.${userId},contact_user_id.eq.${to_user_id}),and(user_id.eq.${to_user_id},contact_user_id.eq.${userId})`)
        .eq('status', 'accepted')
        .single();

      if (!contact) {
        return res.status(403).json({ error: 'Can only send call requests to contacts' });
      }

      // Create call request
      const { data: request, error } = await supabase
        .from('call_requests')
        .insert({
          from_user_id: userId,
          to_user_id,
          platform,
          message,
          note,
          status: 'pending'
        })
        .select(`
          *,
          from_user:from_user_id (id, name, avatar_url, timezone)
        `)
        .single();

      if (error) {
        logger.error('Error creating call request:', error);
        return res.status(500).json({ error: 'Failed to create call request' });
      }

      // Send real-time notification
      const io = req.app.get('io');
      io.to(`user-${to_user_id}`).emit('call-request', {
        request
      });

      // Create notification
      await supabase.from('notifications').insert({
        user_id: to_user_id,
        type: 'call_request',
        title: 'New Call Request',
        message: `${req.user.user_metadata?.name || 'Someone'} wants to ${platform === 'Video Call' ? 'video call' : 'call'} you`,
        data: { request_id: request.id, platform }
      });

      res.status(201).json({
        message: 'Call request sent successfully',
        request
      });

    } catch (error) {
      logger.error('Error creating call request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   PATCH /api/call-requests/:id/respond
 * @desc    Respond to a call request
 * @access  Private
 */
router.patch('/:id/respond',
  [
    body('status').isIn(['accepted', 'rejected']),
    body('response_time').optional().isIn(['now', '15min', '30min', '60min'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { id } = req.params;
      const { status, response_time } = req.body;

      const { data: request, error } = await supabase
        .from('call_requests')
        .update({
          status,
          response_time,
          responded_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('to_user_id', userId)
        .select(`
          *,
          to_user:to_user_id (id, name, avatar_url)
        `)
        .single();

      if (error || !request) {
        logger.error('Error responding to call request:', error);
        return res.status(404).json({ error: 'Call request not found' });
      }

      // Notify the requester
      const io = req.app.get('io');
      io.to(`user-${request.from_user_id}`).emit('call-response', {
        request,
        status,
        response_time
      });

      // Create notification
      await supabase.from('notifications').insert({
        user_id: request.from_user_id,
        type: 'call_response',
        title: `Call Request ${status === 'accepted' ? 'Accepted' : 'Declined'}`,
        message: `${req.user.user_metadata?.name || 'User'} ${status === 'accepted' ? `will call you ${response_time || 'soon'}` : 'declined your call request'}`,
        data: { request_id: request.id }
      });

      res.json({
        message: 'Response sent successfully',
        request
      });

    } catch (error) {
      logger.error('Error responding to call request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   DELETE /api/call-requests/:id
 * @desc    Cancel a call request
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('call_requests')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .eq('from_user_id', userId);

    if (error) {
      logger.error('Error cancelling call request:', error);
      return res.status(500).json({ error: 'Failed to cancel call request' });
    }

    res.json({ message: 'Call request cancelled successfully' });

  } catch (error) {
    logger.error('Error cancelling call request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
