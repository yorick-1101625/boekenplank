function errorHandler(err, req, res, _) {
    console.error(err.stack)

    const statusCode = err.statusCode || 500;
    const code = err.code || "internal_server_error"
    res.status(statusCode).json({
        "error": {
            "code": code,
            "message": err.message,
        }
    })
}

module.exports = errorHandler;