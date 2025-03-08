"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRepository = exports.PaymentRepository = void 0;
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const payment_model_1 = require("../models/payment.model");
const date_fns_1 = require("date-fns");
class PaymentRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(payment_model_1.default);
    }
    async findById(id) {
        return await this.model
            .findOne({ _id: id, deletedAt: null })
            .populate(['organization', 'subscription']);
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
            .populate(['organization', 'subscription']);
        return { results, total };
    }
}
exports.PaymentRepository = PaymentRepository;
exports.paymentRepository = new PaymentRepository();
//# sourceMappingURL=payment.repository.js.map