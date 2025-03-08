"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse_1 = require("../core/ApiResponse");
const customResponses = (req, res, next) => {
    res.ok = function (payload) {
        return new ApiResponse_1.SuccessResponse(payload.message, payload.data).send(res);
    };
    res.created = function (payload) {
        return new ApiResponse_1.CreatedResponse(payload.message, payload.data).send(res);
    };
    res.noContent = function (payload) {
        return new ApiResponse_1.NoContentMsgResponse(payload?.message).send(res);
    };
    next();
};
exports.default = customResponses;
//# sourceMappingURL=custom.middleware.js.map