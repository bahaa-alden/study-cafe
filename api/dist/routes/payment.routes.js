"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = exports.PaymentRoutes = void 0;
const express_1 = require("express");
const validator_1 = require("../middlewares/validator");
const payment_schema_1 = require("../schemas/payment.schema");
const restrict_1 = require("../middlewares/restrict");
const enum_1 = require("../utils/enum");
const authorization_1 = require("../auth/authorization");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const authJwt_1 = require("../middlewares/authJwt");
const { USER, ADMIN } = enum_1.RoleCode;
class PaymentRoutes {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        // PROTECTED ROUTES
        this.router.use((0, validator_1.default)({ headers: auth_schema_1.default.auth }), authJwt_1.authMiddleware.authenticateJWT);
        // GET ALL PAYMENTS
        this.router.get('/', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ query: payment_schema_1.default.paymentAll }), payment_controller_1.paymentController.getPayments);
        // GET PAYMENT BY ID
        this.router.get('/:id', (0, restrict_1.default)(USER, ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: payment_schema_1.default.paymentId }), payment_controller_1.paymentController.getPayment);
        // CREATE PAYMENT
        this.router.post('/', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ body: payment_schema_1.default.paymentCreate }), payment_controller_1.paymentController.createPayment);
        // UPDATE PAYMENT BY ID
        this.router.patch('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({
            params: payment_schema_1.default.paymentId,
            body: payment_schema_1.default.paymentUpdate,
        }), payment_controller_1.paymentController.updatePayment);
        // DELETE PAYMENT BY ID
        this.router.delete('/:id', (0, restrict_1.default)(ADMIN), authorization_1.authorizationMiddleware.authorization, (0, validator_1.default)({ params: payment_schema_1.default.paymentId }), payment_controller_1.paymentController.deletePayment);
    }
}
exports.PaymentRoutes = PaymentRoutes;
exports.paymentRoutes = new PaymentRoutes();
//# sourceMappingURL=payment.routes.js.map