"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const common_2 = require("./common");
const enum_1 = require("./../utils/enum");
const zod_1 = require("zod");
const common_3 = require("./common");
const dessertIdSchema = (0, zod_1.object)({
    id: common_2.objectId,
});
const dessertAllSchema = (0, zod_1.object)({
    page: common_3.page,
    pageSize: common_3.pageSize,
    orderColumn: common_3.orderColumn,
    orderDirection: common_3.orderDirection,
    search: (0, zod_1.string)().optional(),
    type: zod_1.z.nativeEnum(enum_1.DessertType).optional(),
});
const dessertCreateSchema = (0, zod_1.object)({
    // <creating-property-create-schema />
    name: common_1.localString,
    type: zod_1.z.nativeEnum(enum_1.DessertType),
    price: zod_1.z.number(),
}).strict();
const dessertUpdateSchema = (0, zod_1.object)({
    // <creating-property-update-schema />
    name: common_1.localString.optional(),
    type: zod_1.z.nativeEnum(enum_1.DessertType).optional(),
    price: zod_1.z.number().optional(),
}).strict();
exports.default = {
    dessertId: dessertIdSchema,
    dessertAll: dessertAllSchema,
    dessertCreate: dessertCreateSchema,
    dessertUpdate: dessertUpdateSchema,
};
//# sourceMappingURL=dessert.schema.js.map