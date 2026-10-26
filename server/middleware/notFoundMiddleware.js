/**
 * middleware/notFoundMiddleware.js
 *
 * Catches any request that didn't match a defined route and returns
 * a structured 404 JSON response — no HTML error pages.
 *
 * Must be registered AFTER all routes in app.js.
 */

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass to the central error handler
};

module.exports = notFound;
