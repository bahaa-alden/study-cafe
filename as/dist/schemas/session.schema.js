"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./../utils/enum");
const common_1 = require("./common");
const common_2 = require("./common");
const zod_1 = require("zod");
const common_3 = require("./common");
const sessionIdSchema = zod_1.z.object({
    id: common_2.objectId,
});
const sessionAllSchema = zod_1.z.object({
    page: common_3.page,
    pageSize: common_3.pageSize,
    orderColumn: common_3.orderColumn,
    orderDirection: common_3.orderDirection,
    search: zod_1.z.string().optional(),
    dateFrom: common_1.stringToDate.optional(),
    dateTo: common_1.stringToDate.optional(),
    status: zod_1.z.nativeEnum(enum_1.SessionStatus).optional(),
});
const sessionCreateSchema = zod_1.z
    .object({
    // <creating-property-create-schema />
    numberOfPersons: zod_1.z.number(),
    username: zod_1.z.string(),
})
    .strict();
const sessionUpdateSchema = zod_1.z
    .object({
    // <creating-property-update-schema />
    numberOfPersons: zod_1.z.number().optional(),
    status: zod_1.z.nativeEnum(enum_1.SessionStatus).optional(),
    subtotal: zod_1.z.number().optional(),
    additionalCost: zod_1.z.number().optional(),
    totalCost: zod_1.z.number().optional(),
    endTime: common_1.stringToDate.optional(),
})
    .strict();
const sessionAddDessertSchema = zod_1.z
    .object({
    dessertId: common_2.objectId,
    count: zod_1.z.number(),
})
    .strict();
exports.default = {
    sessionId: sessionIdSchema,
    sessionAll: sessionAllSchema,
    sessionCreate: sessionCreateSchema,
    sessionUpdate: sessionUpdateSchema,
    sessionAddDessert: sessionAddDessertSchema,
};
//# sourceMappingURL=session.schema.js.map