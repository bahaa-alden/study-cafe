"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionOrderController = exports.SubscriptionOrderController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const subscription_order_repository_1 = require("../database/repositories/subscription-order.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
const enum_1 = require("../utils/enum");
const create_1 = require("../services/internal/subscriptions/create");
class SubscriptionOrderController {
    // Get all SubscriptionOrders by author
    getSubscriptionOrders = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                // filters
                organizationId: req.valid.query.organizationId,
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const subscriptionOrders = await subscription_order_repository_1.subscriptionOrderRepository.findForAdmin(options);
        res.ok({ message: 'success', data: subscriptionOrders });
    });
    getMine = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                // filters
                organizationId: req.valid.headers['organization-id'],
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const subscriptionOrders = await subscription_order_repository_1.subscriptionOrderRepository.findForAdmin(options);
        res.ok({ message: 'success', data: subscriptionOrders });
    });
    // Get subscriptionOrder by Id for authenticated user
    getSubscriptionOrder = (0, asyncHandler_1.default)(async (req, res) => {
        const subscriptionOrder = (0, record_1.needRecord)(await subscription_order_repository_1.subscriptionOrderRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('SubscriptionOrder not found'));
        res.ok({ message: 'success', data: subscriptionOrder });
    });
    // Create subscriptionOrder handler
    createSubscriptionOrder = (0, asyncHandler_1.default)(async (req, res, next) => {
        const newSubscriptionOrder = req.valid.body;
        const subscriptionOrder = await subscription_order_repository_1.subscriptionOrderRepository.insert(newSubscriptionOrder);
        if (subscriptionOrder === null) {
            throw new ApiError_1.InternalError();
        }
        res.created({
            message: 'SubscriptionOrder has been created',
            data: subscriptionOrder,
        });
    });
    // Update subscriptionOrder by Id for authenticated user
    updateSubscriptionOrder = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const subscriptionOrder = (0, record_1.needRecord)(await subscription_order_repository_1.subscriptionOrderRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('SubscriptionOrder not found'));
        const data = await subscription_order_repository_1.subscriptionOrderRepository.patchById(subscriptionOrder.id, updateBody);
        res.ok({ message: 'SubscriptionOrder has been updated', data });
    });
    // Delete subscriptionOrder by Id for authenticated user
    deleteSubscriptionOrder = (0, asyncHandler_1.default)(async (req, res) => {
        const subscriptionOrder = (0, record_1.needRecord)(await subscription_order_repository_1.subscriptionOrderRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('SubscriptionOrder not found'));
        await subscription_order_repository_1.subscriptionOrderRepository.deleteById(subscriptionOrder.id);
        res.noContent({ message: 'SubscriptionOrder deleted successfully' });
    });
    approve = (0, asyncHandler_1.default)(async (req, res, next) => {
        const subscriptionOrder = (0, record_1.needRecord)(await subscription_order_repository_1.subscriptionOrderRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('SubscriptionOrder not found'));
        await subscription_order_repository_1.subscriptionOrderRepository.patchById(subscriptionOrder.id, {
            status: enum_1.SubscriptionOrderStatus.approved,
        });
        await (0, create_1.createSubscriptionService)({
            organizationId: subscriptionOrder.organizationId,
            planId: subscriptionOrder.planId,
        });
        res.ok({ message: 'SubscriptionOrder has been approved' });
    });
    refuse = (0, asyncHandler_1.default)(async (req, res, next) => {
        const subscriptionOrder = (0, record_1.needRecord)(await subscription_order_repository_1.subscriptionOrderRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('SubscriptionOrder not found'));
        await subscription_order_repository_1.subscriptionOrderRepository.patchById(subscriptionOrder.id, {
            status: enum_1.SubscriptionOrderStatus.refused,
        });
        res.ok({ message: 'SubscriptionOrder has been refused' });
    });
}
exports.SubscriptionOrderController = SubscriptionOrderController;
exports.subscriptionOrderController = new SubscriptionOrderController();
//# sourceMappingURL=subscription-order.controller.js.map