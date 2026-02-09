function errorHandler(err, req, res, _) {
    console.error(err)

    const statusCode = err.statusCode || 500;
    const code = err.code || "INTERNAL_SERVER_ERROR"
    res.status(statusCode).json({
        "error": {
            "code": code,
            "message": err.message,
            "timestamp": Date.now(),
            "details": err.details,
        }
    })
}

module.exports = errorHandler;