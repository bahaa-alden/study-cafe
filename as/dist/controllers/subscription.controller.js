"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionController = exports.SubscriptionController = void 0;
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const subscription_repository_1 = require("../database/repositories/subscription.repository");
const order_1 = require("../utils/order");
const pagination_1 = require("../utils/pagination");
const record_1 = require("../utils/record");
const create_1 = require("../services/internal/subscriptions/create");
class SubscriptionController {
    // Get all Subscriptions by author
    getSubscriptions = (0, asyncHandler_1.default)(async (req, res, next) => {
        const options = {
            filter: {
                // filters
                organizationId: req.valid.query.organizationId,
            },
            search: req.valid.query.search,
            order: (0, order_1.defaultOrderParams)(req.valid.query.orderColumn, req.valid.query.orderDirection),
            pagination: (0, pagination_1.defaultPaginationParams)(req.valid.query.page, req.valid.query.pageSize),
        };
        const subscriptions = await subscription_repository_1.subscriptionRepository.findForAdmin(options);
        res.ok({ message: 'success', data: subscriptions });
    });
    // Get subscription by Id for authenticated user
    getSubscription = (0, asyncHandler_1.default)(async (req, res) => {
        const subscription = (0, record_1.needRecord)(await subscription_repository_1.subscriptionRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Subscription not found'));
        res.ok({ message: 'success', data: subscription });
    });
    // Create subscription handler
    createSubscription = (0, asyncHandler_1.default)(async (req, res, next) => {
        const subscription = await (0, create_1.createSubscriptionService)(req.valid.body);
        res.created({
            message: 'Subscription has been created',
            data: subscription,
        });
    });
    // Update subscription by Id for authenticated user
    updateSubscription = (0, asyncHandler_1.default)(async (req, res, next) => {
        const updateBody = req.valid.body;
        const subscription = (0, record_1.needRecord)(await subscription_repository_1.subscriptionRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Subscription not found'));
        const data = await subscription_repository_1.subscriptionRepository.patchById(subscription.id, updateBody);
        res.ok({ message: 'Subscription has been updated', data });
    });
    // Delete subscription by Id for authenticated user
    deleteSubscription = (0, asyncHandler_1.default)(async (req, res) => {
        const subscription = (0, record_1.needRecord)(await subscription_repository_1.subscriptionRepository.findById(req.valid.params.id), new ApiError_1.NotFoundError('Subscription not found'));
        await subscription_repository_1.subscriptionRepository.deleteById(subscription.id);
        res.noContent({ message: 'Subscription deleted successfully' });
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
        const subscriptions = await subscription_repository_1.subscriptionRepository.findForAdmin(options);
        res.ok({ message: 'success', data: subscriptions });
    });
}
exports.SubscriptionController = SubscriptionController;
exports.subscriptionController = new SubscriptionController();
//# sourceMappingURL=subscription.controller.js.map