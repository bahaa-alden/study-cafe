"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const enum_1 = require("./../utils/enum");
const zod_1 = require("zod");
const common_2 = require("./common");
const subscriptionIdSchema = (0, zod_1.object)({
    id: common_1.objectId,
});
const subscriptionAllSchema = (0, zod_1.object)({
    page: common_2.page,
    pageSize: common_2.pageSize,
    orderColumn: common_2.orderColumn,
    orderDirection: common_2.orderDirection,
    search: (0, zod_1.string)().optional(),
    organizationId: common_1.objectId.optional(),
});
const subscriptionCreateSchema = (0, zod_1.object)({
    // <creating-property-create-schema />
    status: zod_1.z.nativeEnum(enum_1.SubscriptionStatus).optional(),
    planId: common_1.objectId,
    organizationId: common_1.objectId,
    expiresDate: common_2.stringToDate.optional(),
    price: zod_1.z.number().optional(),
}).strict();
const subscriptionUpdateSchema = (0, zod_1.object)({
    // <creating-property-update-schema />
    status: zod_1.z.nativeEnum(enum_1.SubscriptionStatus).optional(),
    planId: common_1.objectId.optional(),
    organizationId: common_1.objectId.optional(),
    expiresDate: common_2.stringToDate.optional(),
}).strict();
exports.default = {
    subscriptionId: subscriptionIdSchema,
    subscriptionAll: subscriptionAllSchema,
    subscriptionCreate: subscriptionCreateSchema,
    subscriptionUpdate: subscriptionUpdateSchema,
};
//# sourceMappingURL=subscription.schema.js.map