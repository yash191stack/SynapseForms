/**
 * routes/healthRoutes.js
 *
 * Mounts the health-check controller on its route.
 * Mounted in app.js at /api/health.
 */

const express = require('express');
const router = express.Router();
const { getHealth } = require('../controllers/healthController');

router.get('/', getHealth);

module.exports = router;
