import { SubscriptionStatus } from './../utils/enum';
import { z, type TypeOf } from 'zod';
declare const subscriptionIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type ISubscriptionIdSchema = TypeOf<typeof subscriptionIdSchema>;
declare const subscriptionAllSchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
export type ISubscriptionAllSchema = TypeOf<typeof subscriptionAllSchema>;
declare const subscriptionCreateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof SubscriptionStatus>>;
    planId: z.ZodString;
    organizationId: z.ZodString;
    expiresDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    price: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    organizationId: string;
    planId: string;
    status?: SubscriptionStatus | undefined;
    price?: number | undefined;
    expiresDate?: Date | undefined;
}, {
    organizationId: string;
    planId: string;
    status?: SubscriptionStatus | undefined;
    price?: number | undefined;
    expiresDate?: string | undefined;
}>;
export type ISubscriptionCreateSchema = TypeOf<typeof subscriptionCreateSchema>;
declare const subscriptionUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof SubscriptionStatus>>;
    planId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    expiresDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
}, "strict", z.ZodTypeAny, {
    status?: SubscriptionStatus | undefined;
    organizationId?: string | undefined;
    planId?: string | undefined;
    expiresDate?: Date | undefined;
}, {
    status?: SubscriptionStatus | undefined;
    organizationId?: string | undefined;
    planId?: string | undefined;
    expiresDate?: string | undefined;
}>;
export type ISubscriptionUpdateSchema = TypeOf<typeof subscriptionUpdateSchema>;
declare const _default: {
    subscriptionId: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    subscriptionAll: z.ZodObject<{
        page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
        orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    subscriptionCreate: z.ZodObject<{
        status: z.ZodOptional<z.ZodNativeEnum<typeof SubscriptionStatus>>;
        planId: z.ZodString;
        organizationId: z.ZodString;
        expiresDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        price: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        organizationId: string;
        planId: string;
        status?: SubscriptionStatus | undefined;
        price?: number | undefined;
        expiresDate?: Date | undefined;
    }, {
        organizationId: string;
        planId: string;
        status?: SubscriptionStatus | undefined;
        price?: number | undefined;
        expiresDate?: string | undefined;
    }>;
    subscriptionUpdate: z.ZodObject<{
        status: z.ZodOptional<z.ZodNativeEnum<typeof SubscriptionStatus>>;
        planId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        expiresDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    }, "strict", z.ZodTypeAny, {
        status?: SubscriptionStatus | undefined;
        organizationId?: string | undefined;
        planId?: string | undefined;
        expiresDate?: Date | undefined;
    }, {
        status?: SubscriptionStatus | undefined;
        organizationId?: string | undefined;
        planId?: string | undefined;
        expiresDate?: string | undefined;
    }>;
};
export default _default;
