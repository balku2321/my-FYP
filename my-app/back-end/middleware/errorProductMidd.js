// Middleware for handling 404 errors
export const notFound = (req, res, next) => {
  console.error(`Route not found: ${req.originalUrl}`);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware for handling general errors
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
