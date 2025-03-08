"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.UserRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const auth_schema_1 = require("../schemas/auth.schema");
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schemas/user.schema");
const enum_1 = require("../utils/enum");
const restrict_1 = require("../middlewares/restrict");
const authorization_1 = require("../auth/authorization");
const authJwt_1 = require("../middlewares/authJwt");
const auth_controller_1 = require("../controllers/auth.controller");
class UserRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // REGISTER
        this.router.post('/register', (0, validator_1.default)({ body: auth_schema_1.default.signup }), auth_controller_1.authController.registerUser);
        // LOGIN
        this.router.post('/login', (0, validator_1.default)({ body: auth_schema_1.default.credential }), auth_controller_1.authController.authenticateUser);
        this.router.post('/forgotPassword', (0, validator_1.default)({ body: auth_schema_1.default.forgotPassword }), auth_controller_1.authController.forgotPassword);
        this.router.patch('/resetPassword', (0, validator_1.default)({ body: auth_schema_1.default.resetPassword }), auth_controller_1.authController.resetPassword);
        // protect routes
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        this.router.patch('/updateMyPassword', (0, validator_1.default)({ body: auth_schema_1.default.updateMyPassword }), auth_controller_1.authController.updateMyPassword);
        // ME
        this.router.get('/me', user_controller_1.userController.me);
        // UPDATE ME
        this.router.patch('/me', (0, validator_1.default)({ body: user_schema_1.default.updateMeSchema }), user_controller_1.userController.updateMe);
        // DELETE ME
        this.router.delete('/me', user_controller_1.userController.deleteMe);
        // Get All Users
        this.router.get('/', (0, validator_1.default)({ query: user_schema_1.default.userAll }), user_controller_1.userController.get);
        // only for admins
        this.router.use((0, restrict_1.default)(enum_1.RoleCode.ADMIN));
        this.router.use(authorization_1.authorizationMiddleware.authorization);
        // Get User BY ID
        this.router.get('/:id', (0, validator_1.default)({ params: user_schema_1.default.userId, body: user_schema_1.default.updateUser }), user_controller_1.userController.getOne);
        // UPDATE User BY ID
        this.router.patch('/:id', (0, validator_1.default)({ params: user_schema_1.default.userId, body: user_schema_1.default.updateUser }), user_controller_1.userController.updateOne);
        // DELETE USER BY ID
        this.router.delete('/:id', (0, validator_1.default)({ params: user_schema_1.default.userId }), user_controller_1.userController.deleteOne);
    }
}
exports.UserRoutes = UserRoutes;
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.routes.js.map