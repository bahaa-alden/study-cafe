"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const subscriptionSchema = new mongoose_2.Schema({
    // <creating-property-schema />
    expiresDate: {
        type: Date,
        default: null,
    },
    startsDate: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: Object.values(enum_1.SubscriptionStatus),
        default: enum_1.SubscriptionStatus.pending,
    },
    planId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Plan',
    },
    organizationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'Subscription',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
subscriptionSchema.virtual('organization', {
    localField: 'organizationId',
    foreignField: '_id',
    ref: 'Organization',
    justOne: true,
    match: { deletedAt: null },
});
subscriptionSchema.virtual('plan', {
    localField: 'planId',
    foreignField: '_id',
    ref: 'Plan',
    justOne: true,
    match: { deletedAt: null },
});
subscriptionSchema.virtual('payment', {
    localField: '_id',
    foreignField: 'subscriptionId',
    ref: 'Payment',
    justOne: true,
    match: { deletedAt: null },
});
exports.default = (0, mongoose_2.model)('Subscription', subscriptionSchema);
//# sourceMappingURL=subscription.model.js.map