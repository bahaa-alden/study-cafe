"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRepository = exports.PlanRepository = void 0;
const date_fns_1 = require("date-fns");
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const plan_model_1 = require("../models/plan.model");
class PlanRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(plan_model_1.default);
    }
    async findForAdmin(options) {
        const { order, pagination, search, filter } = options;
        const query = { deletedAt: null };
        if (filter?.dateFrom ?? filter?.dateTo) {
            query.createdAt = {};
            if (filter.dateFrom) {
                query.createdAt.$gte = (0, date_fns_1.startOfDay)(filter.dateFrom);
            }
            if (filter.dateTo) {
                query.createdAt.$lte = (0, date_fns_1.endOfDay)(filter.dateTo);
            }
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
            .skip((pagination.page - 1) * pagination.pageSize);
        return { results, total };
    }
}
exports.PlanRepository = PlanRepository;
exports.planRepository = new PlanRepository();
//# sourceMappingURL=plan.repository.js.map