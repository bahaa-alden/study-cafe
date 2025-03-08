"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRoutes = exports.PlanRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const plan_schema_1 = require("../schemas/plan.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const plan_controller_1 = require("../controllers/plan.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const { USER, ADMIN } = enum_1.RoleCode;
class PlanRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        // GET ALL PLANS
        this.router.get('/', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ query: plan_schema_1.default.planAll }), plan_controller_1.planController.getPlans);
        // GET PLAN BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: plan_schema_1.default.planId }), plan_controller_1.planController.getPlan);
        // CREATE PLAN
        this.router.post('/', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ body: plan_schema_1.default.planCreate }), plan_controller_1.planController.createPlan);
        // UPDATE PLAN BY ID
        this.router.patch('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: plan_schema_1.default.planId, body: plan_schema_1.default.planUpdate }), plan_controller_1.planController.updatePlan);
        // DELETE PLAN BY ID
        this.router.delete('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: plan_schema_1.default.planId }), plan_controller_1.planController.deletePlan);
    }
}
exports.PlanRoutes = PlanRoutes;
exports.planRoutes = new PlanRoutes();
//# sourceMappingURL=plan.routes.js.map