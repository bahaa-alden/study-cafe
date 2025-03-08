"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./../../utils/types");
const mongoose_1 = require("mongoose");
const enum_1 = require("./../../utils/enum");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const dessertSchema = new mongoose_2.Schema({
    // <creating-property-schema />
    name: {
        type: types_1.localStringSchema,
        of: String,
    },
    organizationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    type: {
        type: String,
        enum: Object.values(enum_1.DessertType),
    },
    price: {
        type: Number,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    collection: 'Dessert',
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => (0, lodash_1.omit)(ret, ['deletedAt', '__v', '_id']),
    },
});
dessertSchema.virtual('organization', {
    localField: 'organizationId',
    foreignField: '_id',
    ref: 'Organization',
    justOne: true,
    match: { deletedAt: null },
});
exports.default = (0, mongoose_2.model)('Dessert', dessertSchema);
//# sourceMappingURL=dessert.model.js.map