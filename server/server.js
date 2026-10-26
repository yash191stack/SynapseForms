/**
 * server.js
 *
 * Entry point for the SynapseForms backend.
 *
 * Responsibilities:
 *  1. Load environment variables from .env
 *  2. Conditionally connect to MongoDB (only when ENABLE_DATABASE=true)
 *  3. Start the Express HTTP server
 *
 * Application logic (routes, middleware) lives in app.js — not here.
 */

require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const ENABLE_DATABASE = process.env.ENABLE_DATABASE === 'true';

/**
 * startServer
 *
 * Handles the startup sequence:
 *  - Optionally establishes a MongoDB connection.
 *  - Starts the HTTP server.
 *  - Logs clear, informative startup messages.
 */
const startServer = async () => {
  // ── Optional MongoDB Connection ───────────────────────────────────────────
  if (ENABLE_DATABASE) {
    try {
      await connectDB();
    } catch (error) {
      // A failed DB connection is fatal when the database is intentionally
      // enabled — exit clearly rather than running in a broken state.
      console.error('Startup aborted: could not connect to MongoDB.');
      process.exit(1);
    }
  } else {
    console.log('Database connection skipped (disabled in environment)');
  }

  // ── Start Express Server ──────────────────────────────────────────────────
  app.listen(PORT, () => {
    console.log(`SynapseForms API running on port ${PORT}`);
  });
};

startServer();
