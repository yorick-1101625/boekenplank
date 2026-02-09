class ApiError extends Error {
    constructor(message, statusCode, errorCode, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = errorCode;
        this.details = details;
    }
}

module.exports = ApiError;