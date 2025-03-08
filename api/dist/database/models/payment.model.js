"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const paymentSchema = new mongoose_2.Schema({
    // <creating-property-schema />
    organizationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    status: {
        type: String,
        enum: Object.values(enum_1.PaymentStatus),
        default: enum_1.PaymentStatus.pending,
    },
    amount: {
        type: Number,
        default: 0,
    },
    subscriptionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Subscription',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'Payment',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
paymentSchema.virtual('subscription', {
    localField: 'subscriptionId',
    foreignField: '_id',
    ref: 'Subscription',
    justOne: true,
    match: { deletedAt: null },
});
paymentSchema.virtual('organization', {
    localField: 'organizationId',
    foreignField: '_id',
    ref: 'Organization',
    justOne: true,
    match: { deletedAt: null },
});
exports.default = (0, mongoose_2.model)('Payment', paymentSchema);
//# sourceMappingURL=payment.model.js.map