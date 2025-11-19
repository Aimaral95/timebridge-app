const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/schedule
 * @desc    Get user's schedule blocks
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: blocks, error } = await supabase
      .from('schedule_blocks')
      .select('*')
      .eq('user_id', userId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      logger.error('Error fetching schedule:', error);
      return res.status(500).json({ error: 'Failed to fetch schedule' });
    }

    res.json({ blocks });

  } catch (error) {
    logger.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   POST /api/schedule
 * @desc    Add a schedule block
 * @access  Private
 */
router.post('/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('day_of_week').isInt({ min: 0, max: 6 }).withMessage('Day of week must be 0-6'),
    body('start_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time required'),
    body('end_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid end time required'),
    body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Valid hex color required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { title, day_of_week, start_time, end_time, color } = req.body;

      const { data: block, error } = await supabase
        .from('schedule_blocks')
        .insert({
          user_id: userId,
          title,
          day_of_week,
          start_time,
          end_time,
          color: color || '#3b82f6'
        })
        .select()
        .single();

      if (error) {
        logger.error('Error creating schedule block:', error);
        return res.status(500).json({ error: 'Failed to create schedule block' });
      }

      res.status(201).json({
        message: 'Schedule block created successfully',
        block
      });

    } catch (error) {
      logger.error('Error creating schedule block:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   PATCH /api/schedule/:id
 * @desc    Update a schedule block
 * @access  Private
 */
router.patch('/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('day_of_week').optional().isInt({ min: 0, max: 6 }),
    body('start_time').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('end_time').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('color').optional().matches(/^#[0-9A-F]{6}$/i)
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { id } = req.params;
      const { title, day_of_week, start_time, end_time, color } = req.body;

      const updates = {};
      if (title) updates.title = title;
      if (day_of_week !== undefined) updates.day_of_week = day_of_week;
      if (start_time) updates.start_time = start_time;
      if (end_time) updates.end_time = end_time;
      if (color) updates.color = color;

      const { data: block, error } = await supabase
        .from('schedule_blocks')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error || !block) {
        logger.error('Error updating schedule block:', error);
        return res.status(404).json({ error: 'Schedule block not found' });
      }

      res.json({
        message: 'Schedule block updated successfully',
        block
      });

    } catch (error) {
      logger.error('Error updating schedule block:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * @route   DELETE /api/schedule/:id
 * @desc    Delete a schedule block
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('schedule_blocks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      logger.error('Error deleting schedule block:', error);
      return res.status(500).json({ error: 'Failed to delete schedule block' });
    }

    res.json({ message: 'Schedule block deleted successfully' });

  } catch (error) {
    logger.error('Error deleting schedule block:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
