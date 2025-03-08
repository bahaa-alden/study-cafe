"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDate = exports.localString = exports.orderDirection = exports.orderColumn = exports.pageSize = exports.page = exports.uuid = exports.positiveInteger = exports.referenceId = exports.objectId = exports.numericId = void 0;
const zod_1 = require("zod");
const order_1 = require("../utils/order");
const numericIdRegex = /^\d+$/u;
exports.numericId = zod_1.z.string().regex(numericIdRegex).transform(Number);
const positiveIntegerRegex = /^[1-9]\d*$/u;
const objectIdRegex = /^[0-9a-fA-F]{24}$/u;
const referenceIdRegex = /^\d{9}$/u;
exports.objectId = zod_1.z.string().regex(objectIdRegex);
exports.referenceId = zod_1.z.string().regex(referenceIdRegex);
exports.positiveInteger = zod_1.z
    .string()
    .regex(positiveIntegerRegex)
    .transform(Number);
exports.uuid = zod_1.z.string().uuid();
exports.page = exports.numericId
    .optional()
    .default('1')
    .refine((number) => number >= 0);
exports.pageSize = exports.numericId
    .optional()
    .default('100')
    .refine((number) => number > 0);
exports.orderColumn = zod_1.z
    .enum(['id', 'createdAt'])
    .optional()
    .default('createdAt');
exports.orderDirection = zod_1.z
    .nativeEnum(order_1.OrderDirection)
    .optional()
    .default(order_1.OrderDirection.desc);
exports.localString = zod_1.z.object({
    ar: zod_1.z.string().optional(),
    en: zod_1.z.string().optional(),
});
exports.stringToDate = zod_1.z.string().transform((el) => new Date(el));
//# sourceMappingURL=common.js.map