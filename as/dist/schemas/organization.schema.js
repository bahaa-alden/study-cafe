"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const enum_1 = require("./../utils/enum");
const zod_1 = require("zod");
const common_2 = require("./common");
const organizationIdSchema = (0, zod_1.object)({
    id: common_2.objectId,
});
const organizationStatisticsSchema = (0, zod_1.object)({
    fromDate: common_1.stringToDate.optional(),
    toDate: common_1.stringToDate.optional(),
});
const organizationAllSchema = (0, zod_1.object)({
    page: common_2.page,
    pageSize: common_2.pageSize,
    orderColumn: common_2.orderColumn,
    orderDirection: common_2.orderDirection,
    search: (0, zod_1.string)().optional(),
    dateFrom: common_1.stringToDate.optional(),
    dateTo: common_1.stringToDate.optional(),
    status: zod_1.z.nativeEnum(enum_1.OrgStatus).optional(),
});
const organizationCreateSchema = (0, zod_1.object)({
    // <creating-property-create-schema />
    userId: common_2.objectId.optional(),
    sessionHourlyRate: zod_1.z.number().optional(),
    name: zod_1.z.string(),
}).strict();
const organizationUpdateSchema = (0, zod_1.object)({
    // <creating-property-update-schema />
    sessionHourlyRate: zod_1.z.number().optional().optional(),
    name: zod_1.z.string().optional(),
}).strict();
const organizationHeaderSchema = zod_1.z.object({
    'organization-id': common_2.objectId,
});
exports.default = {
    organizationId: organizationIdSchema,
    organizationAll: organizationAllSchema,
    organizationCreate: organizationCreateSchema,
    organizationUpdate: organizationUpdateSchema,
    organizationHeader: organizationHeaderSchema,
    organizationStatistics: organizationStatisticsSchema,
};
//# sourceMappingURL=organization.schema.js.map