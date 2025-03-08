"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenError = exports.NoDataError = exports.TokenExpiredError = exports.BadTokenError = exports.NoEntryError = exports.ForbiddenError = exports.NotFoundError = exports.ConflictError = exports.BadRequestError = exports.UnprocessableEntityError = exports.InternalError = exports.AuthFailureError = exports.ApiError = exports.ErrorType = void 0;
const ApiResponse_1 = require("./ApiResponse");
const config_1 = require("../config");
var ErrorType;
(function (ErrorType) {
    ErrorType["BAD_TOKEN"] = "BadTokenError";
    ErrorType["TOKEN_EXPIRED"] = "TokenExpiredError";
    ErrorType["UNAUTHORIZED"] = "AuthFailureError";
    ErrorType["ACCESS_TOKEN"] = "AccessTokenError";
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["NO_ENTRY"] = "NoEntryError";
    ErrorType["NO_DATA"] = "NoDataError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
    ErrorType["FORBIDDEN"] = "ForbiddenError";
    ErrorType["UNPROCESSABLE"] = "UnprocessableEntityError";
    ErrorType["CONFLICT"] = "ConflictError";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
class ApiError extends Error {
    type;
    message;
    errors;
    constructor(type, message = 'error', errors) {
        super(type);
        this.type = type;
        this.message = message;
        this.errors = errors;
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new ApiResponse_1.AuthFailureResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new ApiResponse_1.InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new ApiResponse_1.NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new ApiResponse_1.BadRequestResponse(err.message, err.errors).send(res);
            case ErrorType.FORBIDDEN:
                return new ApiResponse_1.ForbiddenResponse(err.message).send(res);
            case ErrorType.UNPROCESSABLE:
                return new ApiResponse_1.UnprocessableEntityResponse(err.message).send(res);
            case ErrorType.CONFLICT:
                return new ApiResponse_1.ConflictResponse(err.message).send(res);
            default: {
                let message = err.message;
                if (config_1.env_vars.env === 'production')
                    message = 'Something wrong happened.';
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    }
}
exports.ApiError = ApiError;
class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}
exports.AuthFailureError = AuthFailureError;
class InternalError extends ApiError {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}
exports.InternalError = InternalError;
class UnprocessableEntityError extends ApiError {
    constructor(message = 'Unprocessable Entity') {
        super(ErrorType.UNPROCESSABLE, message);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request', errors = []) {
        super(ErrorType.BAD_REQUEST, message, errors);
    }
}
exports.BadRequestError = BadRequestError;
class ConflictError extends ApiError {
    constructor(message = 'Conflict') {
        super(ErrorType.CONFLICT, message);
    }
}
exports.ConflictError = ConflictError;
class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
        super(ErrorType.FORBIDDEN, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class NoEntryError extends ApiError {
    constructor(message = "Entry don't exists") {
        super(ErrorType.NO_ENTRY, message);
    }
}
exports.NoEntryError = NoEntryError;
class BadTokenError extends ApiError {
    constructor(message = 'Token is not valid') {
        super(ErrorType.BAD_TOKEN, message);
    }
}
exports.BadTokenError = BadTokenError;
class TokenExpiredError extends ApiError {
    constructor(message = 'Token is expired') {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}
exports.TokenExpiredError = TokenExpiredError;
class NoDataError extends ApiError {
    constructor(message = 'No data available') {
        super(ErrorType.NO_DATA, message);
    }
}
exports.NoDataError = NoDataError;
class AccessTokenError extends ApiError {
    constructor(message = 'Invalid access token') {
        super(ErrorType.ACCESS_TOKEN, message);
    }
}
exports.AccessTokenError = AccessTokenError;
//# sourceMappingURL=ApiError.js.map