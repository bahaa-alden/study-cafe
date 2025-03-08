"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRepository = exports.OrganizationRepository = void 0;
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const organization_model_1 = require("../models/organization.model");
const date_fns_1 = require("date-fns");
class OrganizationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(organization_model_1.default);
    }
    async findById(id) {
        return await this.model
            .findOne({
            _id: id,
            deletedAt: null,
        })
            .populate([
            { path: 'recentSubscription', populate: { path: 'plan' } },
            'user',
        ]);
    }
    async findByIdWithUser(id, userId) {
        return await this.model
            .findOne({
            _id: id,
            userId,
            deletedAt: null,
        })
            .populate([
            { path: 'recentSubscription', populate: { path: 'plan' } },
            'user',
        ]);
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
        if (filter?.status) {
            query.status = filter.status;
        }
        if (search) {
            query.$or = [{ name: { $regex: new RegExp(search, 'i') } }];
        }
        if (filter?.userId) {
            query.userId = filter.userId;
        }
        const total = await this.model.where(query).countDocuments();
        const results = await this.model
            .find(query)
            .sort({
            [order.column]: order.direction === order_1.OrderDirection.asc ? 1 : -1,
        })
            .limit(pagination.pageSize)
            .skip((pagination.page - 1) * pagination.pageSize)
            .populate([
            { path: 'recentSubscription', populate: { path: 'plan' } },
            'user',
        ]);
        return { results, total };
    }
}
exports.OrganizationRepository = OrganizationRepository;
exports.organizationRepository = new OrganizationRepository();
//# sourceMappingURL=organization.repository.js.map