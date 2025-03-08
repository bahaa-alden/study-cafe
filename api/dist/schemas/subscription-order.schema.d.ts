import { type TypeOf } from 'zod';
declare const subscriptionOrderIdSchema: import("zod").ZodObject<{
    id: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type ISubscriptionOrderIdSchema = TypeOf<typeof subscriptionOrderIdSchema>;
declare const subscriptionOrderAllSchema: import("zod").ZodObject<{
    page: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, number, string>>>, number, string | undefined>;
    pageSize: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, number, string>>>, number, string | undefined>;
    orderColumn: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["id", "createdAt"]>>>;
    orderDirection: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: import("zod").ZodOptional<import("zod").ZodString>;
    organizationId: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    page: number;
    pageSize: number;
    orderColumn: "id" | "createdAt";
    orderDirection: import("../utils/order").OrderDirection;
    search?: string | undefined;
    organizationId?: string | undefined;
}, {
    search?: string | undefined;
    page?: string | undefined;
    pageSize?: string | undefined;
    orderColumn?: "id" | "createdAt" | undefined;
    orderDirection?: import("../utils/order").OrderDirection | undefined;
    organizationId?: string | undefined;
}>;
export type ISubscriptionOrderAllSchema = TypeOf<typeof subscriptionOrderAllSchema>;
declare const subscriptionOrderCreateSchema: import("zod").ZodObject<{
    organizationId: import("zod").ZodString;
    planId: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    organizationId: string;
    planId: string;
}, {
    organizationId: string;
    planId: string;
}>;
export type ISubscriptionOrderCreateSchema = TypeOf<typeof subscriptionOrderCreateSchema>;
declare const subscriptionOrderUpdateSchema: import("zod").ZodObject<{
    organizationId: import("zod").ZodOptional<import("zod").ZodString>;
    planId: import("zod").ZodOptional<import("zod").ZodString>;
}, "strict", import("zod").ZodTypeAny, {
    organizationId?: string | undefined;
    planId?: string | undefined;
}, {
    organizationId?: string | undefined;
    planId?: string | undefined;
}>;
export type ISubscriptionOrderUpdateSchema = TypeOf<typeof subscriptionOrderUpdateSchema>;
declare const _default: {
    subscriptionOrderId: import("zod").ZodObject<{
        id: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    subscriptionOrderAll: import("zod").ZodObject<{
        page: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, number, string>>>, number, string | undefined>;
        pageSize: import("zod").ZodEffects<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, number, string>>>, number, string | undefined>;
        orderColumn: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["id", "createdAt"]>>>;
        orderDirection: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: import("zod").ZodOptional<import("zod").ZodString>;
        organizationId: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        page: number;
        pageSize: number;
        orderColumn: "id" | "createdAt";
        orderDirection: import("../utils/order").OrderDirection;
        search?: string | undefined;
        organizationId?: string | undefined;
    }, {
        search?: string | undefined;
        page?: string | undefined;
        pageSize?: string | undefined;
        orderColumn?: "id" | "createdAt" | undefined;
        orderDirection?: import("../utils/order").OrderDirection | undefined;
        organizationId?: string | undefined;
    }>;
    subscriptionOrderCreate: import("zod").ZodObject<{
        organizationId: import("zod").ZodString;
        planId: import("zod").ZodString;
    }, "strict", import("zod").ZodTypeAny, {
        organizationId: string;
        planId: string;
    }, {
        organizationId: string;
        planId: string;
    }>;
    subscriptionOrderUpdate: import("zod").ZodObject<{
        organizationId: import("zod").ZodOptional<import("zod").ZodString>;
        planId: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strict", import("zod").ZodTypeAny, {
        organizationId?: string | undefined;
        planId?: string | undefined;
    }, {
        organizationId?: string | undefined;
        planId?: string | undefined;
    }>;
};
export default _default;
