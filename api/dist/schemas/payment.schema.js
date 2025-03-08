"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const common_2 = require("./common");
const enum_1 = require("./../utils/enum");
const zod_1 = require("zod");
const common_3 = require("./common");
const paymentIdSchema = (0, zod_1.object)({
    id: common_2.objectId,
});
const paymentAllSchema = (0, zod_1.object)({
    page: common_3.page,
    pageSize: common_3.pageSize,
    orderColumn: common_3.orderColumn,
    orderDirection: common_3.orderDirection,
    search: (0, zod_1.string)().optional(),
    dateFrom: common_1.stringToDate.optional(),
    dateTo: common_1.stringToDate.optional(),
    organizationId: common_2.objectId.optional(),
});
const paymentCreateSchema = (0, zod_1.object)({
    // <creating-property-create-schema />
    status: zod_1.z.nativeEnum(enum_1.PaymentStatus).optional(),
    amount: zod_1.z.number(),
    subscriptionId: common_2.objectId,
}).strict();
const paymentUpdateSchema = (0, zod_1.object)({
    // <creating-property-update-schema />
    status: zod_1.z.nativeEnum(enum_1.PaymentStatus).optional(),
    amount: zod_1.z.number().optional(),
    subscriptionId: common_2.objectId.optional(),
}).strict();
exports.default = {
    paymentId: paymentIdSchema,
    paymentAll: paymentAllSchema,
    paymentCreate: paymentCreateSchema,
    paymentUpdate: paymentUpdateSchema,
};
//# sourceMappingURL=payment.schema.js.map