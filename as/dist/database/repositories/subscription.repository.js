"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRepository = exports.SubscriptionRepository = void 0;
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const subscription_model_1 = require("../models/subscription.model");
class SubscriptionRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(subscription_model_1.default);
    }
    findById(id) {
        return this.model
            .findById(id)
            .where({ deletedAt: null })
            .populate(['organization', 'plan', 'payment']);
    }
    async findForAdmin(options) {
        const { order, pagination, search, filter } = options;
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
            .populate(['plan', 'payment', 'organization']);
        return { results, total };
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
exports.subscriptionRepository = new SubscriptionRepository();
//# sourceMappingURL=subscription.repository.js.map