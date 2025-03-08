"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const enum_1 = require("./../utils/enum");
const zod_1 = require("zod");
const common_2 = require("./common");
const userIdSchema = zod_1.z.object({
    id: common_2.objectId,
});
const userUpdateSchema = zod_1.z
    .object({
    // <creating-property-update-schema />
    status: zod_1.z.nativeEnum(enum_1.UserStatus).optional(),
})
    .strict();
const userUpdateMeSchema = zod_1.z
    .object({
    // <creating-property-update-schema />
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
})
    .strict();
const userAllSchema = zod_1.z.object({
    page: common_2.page,
    pageSize: common_2.pageSize,
    orderColumn: common_2.orderColumn,
    orderDirection: common_2.orderDirection,
    search: zod_1.z.string().optional(),
    dateFrom: common_1.stringToDate.optional(),
    dateTo: common_1.stringToDate.optional(),
});
exports.default = {
    userId: userIdSchema,
    updateUser: userUpdateSchema,
    updateMeSchema: userUpdateMeSchema,
    userAll: userAllSchema,
};
//# sourceMappingURL=user.schema.js.map