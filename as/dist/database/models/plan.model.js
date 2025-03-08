"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./../../utils/types");
const enum_1 = require("./../../utils/enum");
const mongoose_1 = require("mongoose");
const lodash_1 = require("lodash");
const planSchema = new mongoose_1.Schema({
    // <creating-property-schema />
    description: {
        type: types_1.localStringSchema,
        of: String,
    },
    title: {
        type: types_1.localStringSchema,
        of: String,
    },
    duration: {
        type: String,
        enum: Object.values(enum_1.PlanDuration),
    },
    price: {
        type: Number,
        default: 0,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'Plan',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
exports.default = (0, mongoose_1.model)('Plan', planSchema);
//# sourceMappingURL=plan.model.js.map