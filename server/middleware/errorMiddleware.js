/**
 * Global Error Handling Middleware
 */

// Custom error class for API errors
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

// Handle 404 errors
const notFound = (req, res) => {
    const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
    res.status(404).json({
        success: false,
        message: error.message
    });
};

// Global error handler - FIXED (removed next parameter)
const errorHandler = (err, req, res) => {
    let error = { ...err };
    error.message = err.message;
    
    // Log error for debugging
    console.error('Error:', err);
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new AppError(message, 404);
    }
    
    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const message = `${field} already exists. Please use another value.`;
        error = new AppError(message, 400);
    }
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new AppError(message, 400);
    }
    
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = new AppError('Invalid token. Please log in again.', 401);
    }
    
    if (err.name === 'TokenExpiredError') {
        error = new AppError('Token expired. Please log in again.', 401);
    }
    
    // Send response
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

// Async handler to avoid try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    AppError,
    notFound,
    errorHandler,
    asyncHandler
};