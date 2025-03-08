"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRoutes = exports.SubscriptionRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const subscription_schema_1 = require("../schemas/subscription.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const subscription_controller_1 = require("../controllers/subscription.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const organization_schema_1 = require("../schemas/organization.schema");
const { USER, ADMIN } = enum_1.RoleCode;
class SubscriptionRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        // GET ALL SUBSCRIPTIONS
        this.router.get('/', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ query: subscription_schema_1.default.subscriptionAll }), subscription_controller_1.subscriptionController.getSubscriptions);
        // GET ALL SUBSCRIPTIONS
        this.router.get('/mine', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            query: subscription_schema_1.default.subscriptionAll,
            headers: organization_schema_1.default.organizationHeader,
        }), subscription_controller_1.subscriptionController.getMine);
        // GET SUBSCRIPTION BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: subscription_schema_1.default.subscriptionId }), subscription_controller_1.subscriptionController.getSubscription);
        // CREATE SUBSCRIPTION
        this.router.post('/', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ body: subscription_schema_1.default.subscriptionCreate }), subscription_controller_1.subscriptionController.createSubscription);
        // UPDATE SUBSCRIPTION BY ID
        this.router.patch('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: subscription_schema_1.default.subscriptionId,
            body: subscription_schema_1.default.subscriptionUpdate,
        }), subscription_controller_1.subscriptionController.updateSubscription);
        // DELETE SUBSCRIPTION BY ID
        this.router.delete('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: subscription_schema_1.default.subscriptionId }), subscription_controller_1.subscriptionController.deleteSubscription);
    }
}
exports.SubscriptionRoutes = SubscriptionRoutes;
exports.subscriptionRoutes = new SubscriptionRoutes();
//# sourceMappingURL=subscription.routes.js.map