"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const zod_1 = require("zod");
const common_2 = require("./common");
const subscriptionOrderIdSchema = (0, zod_1.object)({
    id: common_1.objectId,
});
const subscriptionOrderAllSchema = (0, zod_1.object)({
    page: common_2.page,
    pageSize: common_2.pageSize,
    orderColumn: common_2.orderColumn,
    orderDirection: common_2.orderDirection,
    search: (0, zod_1.string)().optional(),
    organizationId: common_1.objectId.optional(),
});
const subscriptionOrderCreateSchema = (0, zod_1.object)({
    // <creating-property-create-schema />
    organizationId: common_1.objectId,
    planId: common_1.objectId,
}).strict();
const subscriptionOrderUpdateSchema = (0, zod_1.object)({
    // <creating-property-update-schema />
    organizationId: common_1.objectId.optional(),
    planId: common_1.objectId.optional(),
}).strict();
exports.default = {
    subscriptionOrderId: subscriptionOrderIdSchema,
    subscriptionOrderAll: subscriptionOrderAllSchema,
    subscriptionOrderCreate: subscriptionOrderCreateSchema,
    subscriptionOrderUpdate: subscriptionOrderUpdateSchema,
};
//# sourceMappingURL=subscription-order.schema.js.map