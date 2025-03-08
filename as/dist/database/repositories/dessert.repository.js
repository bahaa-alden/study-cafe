"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dessertRepository = exports.DessertRepository = void 0;
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const dessert_model_1 = require("../models/dessert.model");
class DessertRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(dessert_model_1.default);
    }
    findByIdWithOrg(id, organizationId) {
        return this.model
            .findOne({ _id: id, organizationId, deletedAt: null })
            .populate('organization');
    }
    async findForAdmin(options) {
        const { order, pagination, search, filter } = options;
        const query = { deletedAt: null };
        if (filter?.type) {
            query.type = filter.type;
        }
        if (filter?.organizationId) {
            query.organizationId = filter.organizationId;
        }
        if (search) {
            query.$or = [
                { 'name.ar': { $regex: new RegExp(search, 'i') } },
                { 'name.en': { $regex: new RegExp(search, 'i') } },
            ];
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
exports.DessertRepository = DessertRepository;
exports.dessertRepository = new DessertRepository();
//# sourceMappingURL=dessert.repository.js.map