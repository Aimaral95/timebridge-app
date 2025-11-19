const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authenticate, optionalAuth } = require('../middleware/auth');
const logger = require('../utils/logger');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

/**
 * @route   GET /api/weather/:city
 * @desc    Get weather for a city
 * @access  Public/Private
 */
router.get('/:city', optionalAuth, async (req, res) => {
  try {
    const { city } = req.params;

    if (!WEATHER_API_KEY) {
      // Return mock data if no API key
      return res.json({
        city,
        temp: 72,
        condition: 'Partly Cloudy',
        icon: '02d'
      });
    }

    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'imperial'
      }
    });

    const weather = {
      city: response.data.name,
      temp: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };

    res.json({ weather });

  } catch (error) {
    logger.error('Error fetching weather:', error);
    
    // Return mock data on error
    res.json({
      city: req.params.city,
      temp: 72,
      condition: 'Partly Cloudy',
      icon: '02d'
    });
  }
});

/**
 * @route   GET /api/weather/coords/:lat/:lon
 * @desc    Get weather by coordinates
 * @access  Public/Private
 */
router.get('/coords/:lat/:lon', optionalAuth, async (req, res) => {
  try {
    const { lat, lon } = req.params;

    if (!WEATHER_API_KEY) {
      return res.json({
        temp: 72,
        condition: 'Partly Cloudy',
        icon: '02d'
      });
    }

    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'imperial'
      }
    });

    const weather = {
      city: response.data.name,
      temp: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };

    res.json({ weather });

  } catch (error) {
    logger.error('Error fetching weather by coords:', error);
    
    res.json({
      temp: 72,
      condition: 'Partly Cloudy',
      icon: '02d'
    });
  }
});

module.exports = router;
