/**
 * controllers/healthController.js
 *
 * Handles the GET /api/health endpoint.
 * Returns a simple status payload — no database dependency.
 */

const asyncHandler = require('../utils/asyncHandler');

// @desc    Check API health
// @route   GET /api/health
// @access  Public
const getHealth = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SynapseForms API is running',
    data: {
      status: 'healthy',
    },
  });
});

module.exports = { getHealth };
