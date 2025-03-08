"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRepository = exports.SessionRepository = void 0;
const mongoose_1 = require("mongoose");
const order_1 = require("../../utils/order");
const base_repository_1 = require("./base.repository");
const session_model_1 = require("../models/session.model");
const date_fns_1 = require("date-fns");
const enum_1 = require("../../utils/enum");
class SessionRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(session_model_1.default);
    }
    findByIdWithOrg(id, organizationId) {
        return this.model
            .findOne({ _id: id, organizationId, deletedAt: null })
            .populate(['organization', 'desserts.dessert', 'user']);
    }
    findById(id) {
        return this.model
            .findById(id)
            .where({ deletedAt: null })
            .populate(['organization', 'desserts.dessert', 'user']);
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
            query.$or = [{ username: { $regex: new RegExp(search, 'i') } }];
        }
        if (filter?.organizationId) {
            query.organizationId = filter.organizationId;
        }
        const total = await this.model.where(query).countDocuments();
        const results = await this.model
            .find(query)
            .sort({
            [order.column]: order.direction === order_1.OrderDirection.asc ? 1 : -1,
        })
            .limit(pagination.pageSize)
            .skip((pagination.page - 1) * pagination.pageSize)
            .populate(['user', 'desserts.dessert']);
        return { results, total };
    }
    async getOrganizationStatistics(organizationId, fromDate, toDate) {
        const now = new Date();
        fromDate = fromDate ? (0, date_fns_1.startOfDay)(fromDate) : (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(now, 7));
        toDate = toDate ? (0, date_fns_1.endOfDay)(toDate) : (0, date_fns_1.endOfDay)(now);
        const startYear = (0, date_fns_1.startOfYear)(fromDate);
        const endYear = (0, date_fns_1.endOfYear)(fromDate);
        // Get sessions statistics
        const totalRevenue = Math.ceil((await this.findAll()).reduce((sum, curr) => sum + (curr.totalCost ?? 0), 0));
        const sessions = await this.model.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$deletedAt', null] },
                            { $eq: ['$organizationId', new mongoose_1.Types.ObjectId(organizationId)] },
                        ],
                    },
                },
            },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const revenueByDay = await this.model.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $gte: ['$createdAt', fromDate] },
                            { $lte: ['$createdAt', toDate] },
                            { $eq: ['$status', enum_1.SessionStatus.ended] },
                            { $eq: ['$deletedAt', null] },
                            { $eq: ['$organizationId', new mongoose_1.Types.ObjectId(organizationId)] },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    revenue: { $sum: '$totalCost' },
                    dessertsRevenue: { $sum: '$additionalCost' },
                    sessionsRevenue: { $sum: '$subtotal' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        // Get desserts statistics
        const dessertsByDay = await this.model.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$status', enum_1.SessionStatus.ended] },
                            { $gte: ['$createdAt', fromDate] },
                            { $lte: ['$createdAt', toDate] },
                            { $eq: ['$deletedAt', null] },
                            { $eq: ['$organizationId', new mongoose_1.Types.ObjectId(organizationId)] },
                        ],
                    },
                },
            },
            { $unwind: '$desserts' },
            {
                $lookup: {
                    from: 'Dessert',
                    localField: 'desserts.dessertId',
                    foreignField: '_id',
                    as: 'dessertInfo',
                },
            },
            { $unwind: '$dessertInfo' },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        name: '$dessertInfo.name',
                    },
                    count: { $sum: '$desserts.count' },
                    revenue: {
                        $sum: { $multiply: ['$desserts.count', '$dessertInfo.price'] },
                    },
                },
            },
            {
                $group: {
                    _id: '$_id.date',
                    data: {
                        $push: {
                            name: '$_id.name',
                            count: '$count',
                            revenue: '$revenue',
                        },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const revenueByMonth = await this.model.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $gte: ['$createdAt', startYear] },
                            { $lte: ['$createdAt', endYear] },
                            { $eq: ['$status', enum_1.SessionStatus.ended] },
                            { $eq: ['$deletedAt', null] },
                            { $eq: ['$organizationId', new mongoose_1.Types.ObjectId(organizationId)] },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    revenue: { $sum: '$totalCost' },
                    dessertsRevenue: { $sum: '$additionalCost' },
                    sessionsRevenue: { $sum: '$subtotal' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        // Get desserts statistics
        const dessertsByMonth = await this.model.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$status', enum_1.SessionStatus.ended] },
                            { $gte: ['$createdAt', startYear] },
                            { $lte: ['$createdAt', endYear] },
                            { $eq: ['$deletedAt', null] },
                            { $eq: ['$organizationId', new mongoose_1.Types.ObjectId(organizationId)] },
                        ],
                    },
                },
            },
            { $unwind: '$desserts' },
            {
                $lookup: {
                    from: 'Dessert',
                    localField: 'desserts.dessertId',
                    foreignField: '_id',
                    as: 'dessertInfo',
                },
            },
            { $unwind: '$dessertInfo' },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                        name: '$dessertInfo.name',
                    },
                    count: { $sum: '$desserts.count' },
                    revenue: {
                        $sum: { $multiply: ['$desserts.count', '$dessertInfo.price'] },
                    },
                },
            },
            {
                $group: {
                    _id: '$_id.date',
                    data: {
                        $push: {
                            name: '$_id.name',
                            count: '$count',
                            revenue: '$revenue',
                        },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        return {
            totalSessions: sessions.reduce((sum, s) => sum + s.count, 0),
            totalRevenue,
            sessionsByStatus: sessions,
            revenueByDay,
            revenueByMonth,
            dessertsByDay,
            dessertsByMonth,
        };
    }
}
exports.SessionRepository = SessionRepository;
exports.sessionRepository = new SessionRepository();
//# sourceMappingURL=session.repository.js.map