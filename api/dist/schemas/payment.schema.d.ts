import { PaymentStatus } from './../utils/enum';
import { z, type TypeOf } from 'zod';
declare const paymentIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type IPaymentIdSchema = TypeOf<typeof paymentIdSchema>;
declare const paymentAllSchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    orderColumn: "id" | "createdAt";
    orderDirection: import("../utils/order").OrderDirection;
    search?: string | undefined;
    organizationId?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
}, {
    search?: string | undefined;
    page?: string | undefined;
    pageSize?: string | undefined;
    orderColumn?: "id" | "createdAt" | undefined;
    orderDirection?: import("../utils/order").OrderDirection | undefined;
    organizationId?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
}>;
export type IPaymentAllSchema = TypeOf<typeof paymentAllSchema>;
declare const paymentCreateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof PaymentStatus>>;
    amount: z.ZodNumber;
    subscriptionId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    amount: number;
    subscriptionId: string;
    status?: PaymentStatus | undefined;
}, {
    amount: number;
    subscriptionId: string;
    status?: PaymentStatus | undefined;
}>;
export type IPaymentCreateSchema = TypeOf<typeof paymentCreateSchema>;
declare const paymentUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof PaymentStatus>>;
    amount: z.ZodOptional<z.ZodNumber>;
    subscriptionId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status?: PaymentStatus | undefined;
    amount?: number | undefined;
    subscriptionId?: string | undefined;
}, {
    status?: PaymentStatus | undefined;
    amount?: number | undefined;
    subscriptionId?: string | undefined;
}>;
export type IPaymentUpdateSchema = TypeOf<typeof paymentUpdateSchema>;
declare const _default: {
    paymentId: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    paymentAll: z.ZodObject<{
        page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
        orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: z.ZodOptional<z.ZodString>;
        dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        organizationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        pageSize: number;
        orderColumn: "id" | "createdAt";
        orderDirection: import("../utils/order").OrderDirection;
        search?: string | undefined;
        organizationId?: string | undefined;
        dateFrom?: Date | undefined;
        dateTo?: Date | undefined;
    }, {
        search?: string | undefined;
        page?: string | undefined;
        pageSize?: string | undefined;
        orderColumn?: "id" | "createdAt" | undefined;
        orderDirection?: import("../utils/order").OrderDirection | undefined;
        organizationId?: string | undefined;
        dateFrom?: string | undefined;
        dateTo?: string | undefined;
    }>;
    paymentCreate: z.ZodObject<{
        status: z.ZodOptional<z.ZodNativeEnum<typeof PaymentStatus>>;
        amount: z.ZodNumber;
        subscriptionId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        amount: number;
        subscriptionId: string;
        status?: PaymentStatus | undefined;
    }, {
        amount: number;
        subscriptionId: string;
        status?: PaymentStatus | undefined;
    }>;
    paymentUpdate: z.ZodObject<{
        status: z.ZodOptional<z.ZodNativeEnum<typeof PaymentStatus>>;
        amount: z.ZodOptional<z.ZodNumber>;
        subscriptionId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        status?: PaymentStatus | undefined;
        amount?: number | undefined;
        subscriptionId?: string | undefined;
    }, {
        status?: PaymentStatus | undefined;
        amount?: number | undefined;
        subscriptionId?: string | undefined;
    }>;
};
export default _default;
