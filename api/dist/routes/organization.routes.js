"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRoutes = exports.OrganizationRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const organization_schema_1 = require("../schemas/organization.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const organization_controller_1 = require("../controllers/organization.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const payment_schema_1 = require("../schemas/payment.schema");
const payment_controller_1 = require("../controllers/payment.controller");
const check_subscription_1 = require("../middlewares/check-subscription");
const { USER, ADMIN } = enum_1.RoleCode;
class OrganizationRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        // GET ALL ORGANIZATIONS
        this.router.get('/', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ query: organization_schema_1.default.organizationAll }), organization_controller_1.organizationController.getOrganizations);
        // GET ALL ORGANIZATIONS
        this.router.get('/statistics', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            headers: organization_schema_1.default.organizationHeader,
            query: organization_schema_1.default.organizationStatistics,
        }), check_subscription_1.checkSubscriptionMiddleware, organization_controller_1.organizationController.statistics);
        // CREATE ORGANIZATION
        this.router.post('/', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ body: organization_schema_1.default.organizationCreate }), organization_controller_1.organizationController.createOrganization);
        // APPROVE ORGANIZATION BY ID
        this.router.post('/:id/approve', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: organization_schema_1.default.organizationId,
        }), organization_controller_1.organizationController.approve);
        // REFUSE ORGANIZATION BY ID
        this.router.post('/:id/refuse', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: organization_schema_1.default.organizationId,
        }), organization_controller_1.organizationController.refuse);
        // GET ALL PAYMENTS
        this.router.get('/:id/payments', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            query: payment_schema_1.default.paymentAll,
            params: organization_schema_1.default.organizationId,
        }), payment_controller_1.paymentController.getPayments);
        // GET ORGANIZATION BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: organization_schema_1.default.organizationId }), organization_controller_1.organizationController.getOrganization);
        // UPDATE ORGANIZATION BY ID
        this.router.patch('/:id', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: organization_schema_1.default.organizationId,
            body: organization_schema_1.default.organizationUpdate,
        }), organization_controller_1.organizationController.updateOrganization);
        // DELETE ORGANIZATION BY ID
        this.router.delete('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: organization_schema_1.default.organizationId }), organization_controller_1.organizationController.deleteOrganization);
    }
}
exports.OrganizationRoutes = OrganizationRoutes;
exports.organizationRoutes = new OrganizationRoutes();
//# sourceMappingURL=organization.routes.js.map