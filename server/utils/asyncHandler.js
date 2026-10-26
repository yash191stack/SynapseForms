/**
 * asyncHandler.js
 *
 * A utility wrapper that eliminates repetitive try/catch blocks in async
 * route controllers. Wraps an async function and forwards any thrown error
 * to Express's next() so the central error middleware can handle it.
 *
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => { ... }));
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
