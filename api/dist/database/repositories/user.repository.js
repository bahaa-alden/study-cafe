"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const base_repository_1 = require("./base.repository");
const order_1 = require("../../utils/order");
const user_model_1 = require("../models/user.model");
const enum_1 = require("../../utils/enum");
const date_fns_1 = require("date-fns");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.default);
    }
    async findForUser(options) {
        const { pagination, order, search, filter } = options;
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
        if (filter?.role === enum_1.RoleCode.USER) {
            query.role = enum_1.RoleCode.USER;
        }
        if (search) {
            query.$or = [
                { email: { $regex: new RegExp(search, 'i') } },
                { name: { $regex: new RegExp(search, 'i') } },
            ];
        }
        return await this.model
            .find(query)
            .skip(pagination.pageSize * (pagination.page - 1))
            .limit(pagination.pageSize)
            .sort({
            [order.column]: order.direction === order_1.OrderDirection.asc ? 1 : -1,
        });
    }
    async exists(email) {
        const doc = await this.model.findOne({ email }).where({ deletedAt: null });
        if (doc === null) {
            return false;
        }
        return true;
    }
    async existsName(name) {
        const doc = await this.model.findOne({ name }).where({ deletedAt: null });
        if (doc === null) {
            return false;
        }
        return true;
    }
    async findPrivateProfileById(id) {
        return await this.model.findById(id).where({ deletedAt: null });
    }
    async findOneById(id) {
        return await this.model.findById(id).where({ deletedAt: null });
    }
    // find user by email
    async findByEmail(email) {
        return await this.model.findOne({ email }).where({ deletedAt: null });
    }
    async findByUsername(name) {
        return await this.model.findOne({ name }).where({ deletedAt: null });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map