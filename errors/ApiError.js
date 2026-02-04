class ApiError extends Error {
    statusCode;
    code;

    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.code = errorCode;
    }
}

module.exports = ApiError;