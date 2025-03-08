"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dessertRoutes = exports.DessertRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const dessert_schema_1 = require("../schemas/dessert.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const dessert_controller_1 = require("../controllers/dessert.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const check_subscription_1 = require("../middlewares/check-subscription");
const organization_schema_1 = require("../schemas/organization.schema");
const { USER, ADMIN } = enum_1.RoleCode;
class DessertRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        this.router.use((0, validator_1.default)({
            headers: organization_schema_1.default.organizationHeader,
        }));
        // GET ALL DESSERTS
        this.router.get('/', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            query: dessert_schema_1.default.dessertAll,
            headers: organization_schema_1.default.organizationHeader,
        }), dessert_controller_1.dessertController.getDesserts);
        this.router.use(check_subscription_1.checkSubscriptionMiddleware);
        // GET DESSERT BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: dessert_schema_1.default.dessertId,
            headers: organization_schema_1.default.organizationHeader,
        }), dessert_controller_1.dessertController.getDessert);
        // CREATE DESSERT
        this.router.post('/', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            body: dessert_schema_1.default.dessertCreate,
            headers: organization_schema_1.default.organizationHeader,
        }), dessert_controller_1.dessertController.createDessert);
        // UPDATE DESSERT BY ID
        this.router.patch('/:id', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: dessert_schema_1.default.dessertId,
            body: dessert_schema_1.default.dessertUpdate,
            headers: organization_schema_1.default.organizationHeader,
        }), dessert_controller_1.dessertController.updateDessert);
        // DELETE DESSERT BY ID
        this.router.delete('/:id', (0, restrict_1.default)(USER), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: dessert_schema_1.default.dessertId,
            headers: organization_schema_1.default.organizationHeader,
        }), dessert_controller_1.dessertController.deleteDessert);
    }
}
exports.DessertRoutes = DessertRoutes;
exports.dessertRoutes = new DessertRoutes();
//# sourceMappingURL=dessert.routes.js.map