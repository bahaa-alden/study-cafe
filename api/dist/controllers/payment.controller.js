"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = exports.PaymentController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const payment_repository_1 = require("../database/repositories/payment.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
const subscription_repository_1 = require("../database/repositories/subscription.repository");
class PaymentController {
    // Get all Payments by author
    getPayments = (0, asyncHandler_1.default)(async (req, res, next) => {
        let organizationId = req.valid.query.organizationId ?? undefined;
        if (req.valid.params !== null) {
            organizationId = req.valid.params.id;
        }
        const options = {
            filter: {
                // filters
                dateFrom: req.valid.query.dateFrom,
                dateTo: req.valid.query.dateTo,
                organizationId,
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const payments = await payment_repository_1.paymentRepository.findForAdmin(options);
        res.ok({ message: 'success', data: payments });
    });
    // Get payment by Id for authenticated user
    getPayment = (0, asyncHandler_1.default)(async (req, res) => {
        const payment = (0, record_1.needRecord)(await payment_repository_1.paymentRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Payment not found'));
        res.ok({ message: 'success', data: payment });
    });
    // Create payment handler
    createPayment = (0, asyncHandler_1.default)(async (req, res, next) => {
        const newPayment = req.valid.body;
        const subscription = (0, record_1.needRecord)(await subscription_repository_1.subscriptionRepository.findById(newPayment.subscriptionId), new ApiError_1.NotFoundError('Subscription not found'));
        const payment = await payment_repository_1.paymentRepository.insert({
            ...newPayment,
            organizationId: subscription.organizationId,
        });
        if (payment === null) {
            throw new ApiError_1.InternalError();
        }
        res.created({ message: 'Payment has been created', data: payment });
    });
    // Update payment by Id for authenticated user
    updatePayment = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const payment = (0, record_1.needRecord)(await payment_repository_1.paymentRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Payment not found'));
        const data = await payment_repository_1.paymentRepository.patchById(payment.id, updateBody);
        res.ok({ message: 'Payment has been updated', data });
    });
    // Delete payment by Id for authenticated user
    deletePayment = (0, asyncHandler_1.default)(async (req, res) => {
        const payment = (0, record_1.needRecord)(await payment_repository_1.paymentRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Payment not found'));
        await payment_repository_1.paymentRepository.deleteById(payment.id);
        res.noContent({ message: 'Payment deleted successfully' });
    });
}
exports.PaymentController = PaymentController;
exports.paymentController = new PaymentController();
//# sourceMappingURL=payment.controller.js.map