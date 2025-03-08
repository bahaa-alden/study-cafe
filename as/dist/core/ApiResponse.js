"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedResponse = exports.SuccessResponse = exports.FailureMsgResponse = exports.NoContentMsgResponse = exports.CreatedMsgResponse = exports.SuccessMsgResponse = exports.InternalErrorResponse = exports.ConflictResponse = exports.BadRequestResponse = exports.UnprocessableEntityResponse = exports.ForbiddenResponse = exports.NotFoundResponse = exports.AuthFailureResponse = void 0;
// Helper code for the API consumer to understand the error and handle is accordingly
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
    StatusCode["RETRY"] = "10002";
    StatusCode["INVALID_ACCESS_TOKEN"] = "10003";
    StatusCode["CREATED"] = "10004";
})(StatusCode || (StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    ResponseStatus[ResponseStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    statusCode;
    status;
    message;
    errors;
    type;
    constructor(statusCode, status, message, errors) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
    prepare(res, response, headers) {
        for (const [key, value] of Object.entries(headers))
            res.append(key, value);
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
    send(res, headers = {}) {
        return this.prepare(res, this, headers);
    }
    static sanitize(response) {
        const clone = {};
        if (!response.status.toString().startsWith('2')) {
            if (response.errors) {
                response.type = 'form';
            }
            else
                response.type = 'default';
        }
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === 'undefined')
                delete clone[i];
        return clone;
    }
}
class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
    }
}
exports.AuthFailureResponse = AuthFailureResponse;
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
    }
    send(res, headers = {}) {
        return super.prepare(res, this, headers);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class UnprocessableEntityResponse extends ApiResponse {
    constructor(message = 'UnprocessableEntity') {
        super(StatusCode.FAILURE, ResponseStatus.UNPROCESSABLE_ENTITY, message);
    }
}
exports.UnprocessableEntityResponse = UnprocessableEntityResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters', errors) {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message, errors?.length ? errors : undefined);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class ConflictResponse extends ApiResponse {
    constructor(message = 'Already exist') {
        super(StatusCode.FAILURE, ResponseStatus.CONFLICT, message);
    }
}
exports.ConflictResponse = ConflictResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class SuccessMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }
}
exports.SuccessMsgResponse = SuccessMsgResponse;
class CreatedMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.CREATED, ResponseStatus.CREATED, message);
    }
}
exports.CreatedMsgResponse = CreatedMsgResponse;
class NoContentMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.NO_CONTENT, message);
    }
}
exports.NoContentMsgResponse = NoContentMsgResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
class SuccessResponse extends ApiResponse {
    data;
    constructor(message, data) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res, headers = {}) {
        return super.prepare(res, this, headers);
    }
}
exports.SuccessResponse = SuccessResponse;
class CreatedResponse extends ApiResponse {
    data;
    constructor(message, data) {
        super(StatusCode.CREATED, ResponseStatus.CREATED, message);
        this.data = data;
    }
    send(res, headers = {}) {
        return super.prepare(res, this, headers);
    }
}
exports.CreatedResponse = CreatedResponse;
//# sourceMappingURL=ApiResponse.js.map