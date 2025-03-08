"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodAuthBearer = exports.ValidationSource = void 0;
const zod_1 = require("zod");
const asyncHandler_1 = require("./asyncHandler");
const ApiError_1 = require("../core/ApiError");
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource || (exports.ValidationSource = ValidationSource = {}));
exports.zodAuthBearer = (0, zod_1.string)().refine((value) => {
    if (!value.startsWith('Bearer '))
        return false;
    if (!value.split(' ')[1])
        return false;
    return true;
}, {
    message: 'Invalid Authorization Header',
});
exports.default = (props) => (0, asyncHandler_1.default)(async (req, res, next) => {
    req.valid = {
        body: null,
        params: null,
        query: null,
        headers: null,
    };
    if (props.query && 'query' in req) {
        const validationResult = await props.query.safeParseAsync(req.query);
        if (!validationResult.success) {
            throw new ApiError_1.BadRequestError('Validation error', validationResult.error.errors);
        }
        req.valid.query = validationResult.data;
    }
    if (props.params && 'params' in req) {
        const validationResult = await props.params.safeParseAsync(req.params);
        if (!validationResult.success) {
            throw new ApiError_1.BadRequestError('Validation error', validationResult.error.errors);
        }
        req.valid.params = validationResult.data;
    }
    if (props.body && 'body' in req) {
        const validationResult = await props.body.safeParseAsync(req.body);
        if (!validationResult.success) {
            throw new ApiError_1.BadRequestError('Validation error', validationResult.error.errors);
        }
        req.valid.body = validationResult.data;
    }
    if (props.headers && 'headers' in req) {
        const validationResult = await props.headers.safeParseAsync(req.headers);
        if (!validationResult.success) {
            throw new ApiError_1.BadRequestError('Validation error', validationResult.error.errors);
        }
        req.valid.headers = validationResult.data;
    }
    next();
});
//# sourceMappingURL=validator.js.map