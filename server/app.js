/**
 * app.js
 *
 * Express application configuration.
 * Responsible for middleware setup, route mounting, and error handling.
 * Kept separate from server.js so the app can be tested independently.
 */

const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/healthRoutes');
const notFound = require('./middleware/notFoundMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// ─── Core Middleware ──────────────────────────────────────────────────────────

// Enable Cross-Origin Resource Sharing for all origins.
// Restrict this to specific origins in production via environment variables.
app.use(cors());

// Parse incoming JSON request bodies (e.g., application/json)
app.use(express.json());

// Parse URL-encoded bodies (e.g., HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/api/health', healthRoutes);

// ─── Error Handling ──────────────────────────────────────────────────────────
// Must be registered after all routes.

app.use(notFound);       // 404 — route not matched
app.use(errorHandler);   // 500 — catches errors forwarded via next(err)

module.exports = app;
