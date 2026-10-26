/**
 * middleware/errorMiddleware.js
 *
 * Central error handler for the entire Express application.
 * Must have exactly four parameters (err, req, res, next) so Express
 * recognizes it as an error-handling middleware.
 *
 * Must be registered LAST in app.js, after all routes and notFound.
 */

const errorHandler = (err, req, res, next) => {
  // If a status code was set upstream (e.g., by notFoundMiddleware), use it.
  // Otherwise fall back to 500 Internal Server Error.
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // In development, include the stack trace for easier debugging.
  // In production, suppress it to avoid leaking implementation details.
  const stack =
    process.env.NODE_ENV === 'development' ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(stack && { stack }), // Only include stack key when it has a value
  });
};

module.exports = errorHandler;
