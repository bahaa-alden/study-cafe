"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.AuthMiddleware = void 0;
const passport = require("passport");
require("../auth/passportHandler");
class AuthMiddleware {
    // jwt passport middleware to check  authenticated user
    authenticateJWT(req, res, next) {
        passport.authenticate('jwt', { session: false, failWithError: true })(req, res, next);
    }
}
exports.AuthMiddleware = AuthMiddleware;
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authJwt.js.map