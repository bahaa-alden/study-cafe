"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = exports.AuthorizationMiddleware = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
// Authorization by role
class AuthorizationMiddleware {
    authorization = (0, asyncHandler_1.default)(async (req, res, next) => {
        if (!req.user || !req.user.role || !req.currentRoleCodes)
            throw new ApiError_1.AuthFailureError('Permission denied');
        const { user } = req;
        const roles = req.currentRoleCodes;
        if (!roles)
            throw new ApiError_1.AuthFailureError('Permission denied');
        let authorized = false;
        roles.forEach((role) => {
            if (role === user.role) {
                authorized = true;
                return;
            }
        });
        if (!authorized)
            throw new ApiError_1.AuthFailureError('Permission denied');
        return next();
    });
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
exports.authorizationMiddleware = new AuthorizationMiddleware();
//# sourceMappingURL=authorization.js.map