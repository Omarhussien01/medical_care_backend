const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized
        errorMessage = 'Unauthorized Access';
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403; // Forbidden
        errorMessage = 'Forbidden Access';
    } else if (err.message === 'Not Found') {
        statusCode = 404; // Not Found
        errorMessage = 'Resource Not Found';
    }

    res.status(statusCode);
    res.json({ message: errorMessage, stack: err.stack });
};

export { errorHandler };