"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const sessionSchema = new mongoose_2.Schema({
    // <creating-property-schema />
    numberOfPersons: {
        type: Number,
    },
    desserts: {
        type: [
            {
                dessertId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: 'Dessert',
                },
                count: {
                    type: Number,
                },
                _id: false,
            },
        ],
        default: [],
    },
    status: {
        type: String,
        enum: Object.values(enum_1.SessionStatus),
        default: enum_1.SessionStatus.started,
    },
    subtotal: {
        type: Number,
    },
    additionalCost: {
        type: Number,
        default: 0,
    },
    organizationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    totalCost: {
        type: Number,
        default: null,
    },
    endTime: {
        type: Date,
    },
    startTime: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        index: 'text',
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'Session',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
sessionSchema.virtual('user', {
    localField: 'userId',
    foreignField: '_id',
    ref: 'User',
    justOne: true,
    match: { deletedAt: null },
});
sessionSchema.virtual('organization', {
    localField: 'organizationId',
    foreignField: '_id',
    ref: 'Organization',
    justOne: true,
    match: { deletedAt: null },
});
sessionSchema.virtual('desserts.dessert', {
    localField: 'desserts.dessertId',
    foreignField: '_id',
    ref: 'Dessert',
    justOne: true,
    match: { deletedAt: null },
});
exports.default = (0, mongoose_2.model)('Session', sessionSchema);
//# sourceMappingURL=session.model.js.map