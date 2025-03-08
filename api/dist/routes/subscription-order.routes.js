"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionOrderRoutes = exports.SubscriptionOrderRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const subscription_order_schema_1 = require("../schemas/subscription-order.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const subscription_order_controller_1 = require("../controllers/subscription-order.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const organization_schema_1 = require("../schemas/organization.schema");
const { USER, ADMIN } = enum_1.RoleCode;
class SubscriptionOrderRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        // GET ALL SUBSCRIPTION_ORDERS
        this.router.get('/', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ query: subscription_order_schema_1.default.subscriptionOrderAll }), subscription_order_controller_1.subscriptionOrderController.getSubscriptionOrders);
        // GET ALL SUBSCRIPTION_ORDERS
        this.router.get('/mine', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            query: subscription_order_schema_1.default.subscriptionOrderAll,
            headers: organization_schema_1.default.organizationHeader,
        }), subscription_order_controller_1.subscriptionOrderController.getMine);
        // GET SUBSCRIPTION_ORDER BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: subscription_order_schema_1.default.subscriptionOrderId }), subscription_order_controller_1.subscriptionOrderController.getSubscriptionOrder);
        // CREATE SUBSCRIPTION_ORDER
        this.router.post('/', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ body: subscription_order_schema_1.default.subscriptionOrderCreate }), subscription_order_controller_1.subscriptionOrderController.createSubscriptionOrder);
        // APPROVE SUBSCRIPTION_ORDER BY ID
        this.router.post('/:id/approve', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: subscription_order_schema_1.default.subscriptionOrderId,
        }), subscription_order_controller_1.subscriptionOrderController.approve);
        // REFUSE SUBSCRIPTION_ORDER BY ID
        this.router.post('/:id/refuse', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: subscription_order_schema_1.default.subscriptionOrderId,
        }), subscription_order_controller_1.subscriptionOrderController.refuse);
        // UPDATE SUBSCRIPTION_ORDER BY ID
        this.router.patch('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: subscription_order_schema_1.default.subscriptionOrderId,
            body: subscription_order_schema_1.default.subscriptionOrderUpdate,
        }), subscription_order_controller_1.subscriptionOrderController.updateSubscriptionOrder);
        // DELETE SUBSCRIPTION_ORDER BY ID
        this.router.delete('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: subscription_order_schema_1.default.subscriptionOrderId }), subscription_order_controller_1.subscriptionOrderController.deleteSubscriptionOrder);
    }
}
exports.SubscriptionOrderRoutes = SubscriptionOrderRoutes;
exports.subscriptionOrderRoutes = new SubscriptionOrderRoutes();
//# sourceMappingURL=subscription-order.routes.js.map