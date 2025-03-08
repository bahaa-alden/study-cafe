"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const common_2 = require("./common");
const enum_1 = require("./../utils/enum");
const zod_1 = require("zod");
const common_3 = require("./common");
const planIdSchema = (0, zod_1.object)({
    id: common_3.objectId,
});
const planAllSchema = (0, zod_1.object)({
    page: common_3.page,
    pageSize: common_3.pageSize,
    orderColumn: common_3.orderColumn,
    orderDirection: common_3.orderDirection,
    search: (0, zod_1.string)().optional(),
    dateFrom: common_1.stringToDate.optional(),
    dateTo: common_1.stringToDate.optional(),
});
const planCreateSchema = (0, zod_1.object)({
    // <creating-property-create-schema />
    description: common_2.localString.optional(),
    title: common_2.localString,
    duration: zod_1.z.nativeEnum(enum_1.PlanDuration),
    price: zod_1.z.number(),
}).strict();
const planUpdateSchema = (0, zod_1.object)({
    // <creating-property-update-schema />
    description: common_2.localString.optional(),
    title: common_2.localString.optional(),
    duration: zod_1.z.nativeEnum(enum_1.PlanDuration).optional(),
    price: zod_1.z.number().optional(),
}).strict();
exports.default = {
    planId: planIdSchema,
    planAll: planAllSchema,
    planCreate: planCreateSchema,
    planUpdate: planUpdateSchema,
};
//# sourceMappingURL=plan.schema.js.map