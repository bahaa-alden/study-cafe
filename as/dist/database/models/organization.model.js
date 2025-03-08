"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const organizationSchema = new mongoose_2.Schema({
    // <creating-property-schema />
    recentSubscriptionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Subscription',
    },
    status: {
        type: String,
        enum: Object.values(enum_1.OrgStatus),
        default: enum_1.OrgStatus.pending,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    sessionHourlyRate: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        index: 'text',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'Organization',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
organizationSchema.virtual('user', {
    localField: 'userId',
    foreignField: '_id',
    ref: 'User',
    justOne: true,
    match: { deletedAt: null },
});
organizationSchema.virtual('recentSubscription', {
    localField: 'recentSubscriptionId',
    foreignField: '_id',
    ref: 'Subscription',
    justOne: true,
    match: { deletedAt: null },
});
exports.default = (0, mongoose_2.model)('Organization', organizationSchema);
//# sourceMappingURL=organization.model.js.map