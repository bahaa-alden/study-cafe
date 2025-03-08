"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const subscriptionOrderSchema = new mongoose_2.Schema({
    // <creating-property-schema />
    status: {
        type: String,
        enum: Object.values(enum_1.SubscriptionOrderStatus),
        default: enum_1.SubscriptionOrderStatus.pending,
    },
    organizationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    planId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Plan',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'SubscriptionOrder',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
subscriptionOrderSchema.virtual('plan', {
    localField: 'planId',
    foreignField: '_id',
    ref: 'Plan',
    justOne: true,
    match: { deletedAt: null },
});
subscriptionOrderSchema.virtual('organization', {
    localField: 'organizationId',
    foreignField: '_id',
    ref: 'Organization',
    justOne: true,
    match: { deletedAt: null },
});
exports.default = (0, mongoose_2.model)('SubscriptionOrder', subscriptionOrderSchema);
//# sourceMappingURL=subscription-order.model.js.map