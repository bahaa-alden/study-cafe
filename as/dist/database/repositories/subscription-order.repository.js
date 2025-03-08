"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionOrderRepository = exports.SubscriptionOrderRepository = void 0;
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const subscription_order_model_1 = require("../models/subscription-order.model");
class SubscriptionOrderRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(subscription_order_model_1.default);
    }
    async findById(id) {
        return await this.model
            .findOne({ _id: id, deletedAt: null })
            .populate(['organization', 'plan']);
    }
    async findForAdmin(options) {
        const { order, pagination, filter, search } = options;
        const query = { deletedAt: null };
        if (filter?.organizationId) {
            query.organizationId = filter.organizationId;
        }
        if (search) {
            query.$or = [];
        }
        const total = await this.model.where(query).countDocuments();
        const results = await this.model
            .find(query)
            .sort({
            [order.column]: order.direction === order_1.OrderDirection.asc ? 1 : -1,
        })
            .limit(pagination.pageSize)
            .skip((pagination.page - 1) * pagination.pageSize)
            .populate(['organization', 'plan']);
        return { results, total };
    }
}
exports.SubscriptionOrderRepository = SubscriptionOrderRepository;
exports.subscriptionOrderRepository = new SubscriptionOrderRepository();
//# sourceMappingURL=subscription-order.repository.js.map