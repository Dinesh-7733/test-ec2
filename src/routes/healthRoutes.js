const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @desc    Health check
// @route   GET /api/health
// @access  Public
router.get('/', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
  };

  try {
    res.send(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).send(healthCheck);
  }
});

module.exports = router;
