"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = exports.SessionRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const session_schema_1 = require("../schemas/session.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const session_controller_1 = require("../controllers/session.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const organization_schema_1 = require("../schemas/organization.schema");
const check_subscription_1 = require("../middlewares/check-subscription");
const { USER, ADMIN } = enum_1.RoleCode;
class SessionRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({
            headers: auth_schema_1.default.auth,
        }), authJwt_1.authMiddleware.authenticateJWT);
        this.router.use((0, validator_1.default)({
            headers: organization_schema_1.default.organizationHeader,
        }));
        // GET ALL SESSIONS
        this.router.get('/', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            query: session_schema_1.default.sessionAll,
            headers: organization_schema_1.default.organizationHeader,
        }), session_controller_1.sessionController.getSessions);
        this.router.use(check_subscription_1.checkSubscriptionMiddleware);
        // GET SESSION BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: session_schema_1.default.sessionId,
            headers: organization_schema_1.default.organizationHeader,
        }), session_controller_1.sessionController.getSession);
        // CREATE SESSION
        this.router.post('/', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            body: session_schema_1.default.sessionCreate,
            headers: organization_schema_1.default.organizationHeader,
        }), session_controller_1.sessionController.createSession);
        // End SESSION
        this.router.post('/:id/end', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: session_schema_1.default.sessionId,
            headers: organization_schema_1.default.organizationHeader,
        }), session_controller_1.sessionController.endSession);
        this.router.post('/:id/desserts', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: session_schema_1.default.sessionId,
            headers: organization_schema_1.default.organizationHeader,
            body: session_schema_1.default.sessionAddDessert,
        }), session_controller_1.sessionController.addDessert);
        // UPDATE SESSION BY ID
        this.router.patch('/:id', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: session_schema_1.default.sessionId,
            body: session_schema_1.default.sessionUpdate,
            headers: organization_schema_1.default.organizationHeader,
        }), session_controller_1.sessionController.updateSession);
        // DELETE SESSION BY ID
        this.router.delete('/:id', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: session_schema_1.default.sessionId,
            headers: organization_schema_1.default.organizationHeader,
        }), session_controller_1.sessionController.deleteSession);
    }
}
exports.SessionRoutes = SessionRoutes;
exports.sessionRoutes = new SessionRoutes();
//# sourceMappingURL=session.routes.js.map