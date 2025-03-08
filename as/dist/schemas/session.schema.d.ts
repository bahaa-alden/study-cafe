import { SessionStatus } from './../utils/enum';
import { z, type TypeOf } from 'zod';
declare const sessionIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type ISessionIdSchema = TypeOf<typeof sessionIdSchema>;
declare const sessionAllSchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof SessionStatus>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    orderColumn: "id" | "createdAt";
    orderDirection: import("../utils/order").OrderDirection;
    status?: SessionStatus | undefined;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
}, {
    status?: SessionStatus | undefined;
    search?: string | undefined;
    page?: string | undefined;
    pageSize?: string | undefined;
    orderColumn?: "id" | "createdAt" | undefined;
    orderDirection?: import("../utils/order").OrderDirection | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
}>;
export type ISessionAllSchema = TypeOf<typeof sessionAllSchema>;
declare const sessionCreateSchema: z.ZodObject<{
    numberOfPersons: z.ZodNumber;
    username: z.ZodString;
}, "strict", z.ZodTypeAny, {
    numberOfPersons: number;
    username: string;
}, {
    numberOfPersons: number;
    username: string;
}>;
export type ISessionCreateSchema = TypeOf<typeof sessionCreateSchema>;
declare const sessionUpdateSchema: z.ZodObject<{
    numberOfPersons: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof SessionStatus>>;
    subtotal: z.ZodOptional<z.ZodNumber>;
    additionalCost: z.ZodOptional<z.ZodNumber>;
    totalCost: z.ZodOptional<z.ZodNumber>;
    endTime: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
}, "strict", z.ZodTypeAny, {
    status?: SessionStatus | undefined;
    numberOfPersons?: number | undefined;
    subtotal?: number | undefined;
    additionalCost?: number | undefined;
    totalCost?: number | undefined;
    endTime?: Date | undefined;
}, {
    status?: SessionStatus | undefined;
    numberOfPersons?: number | undefined;
    subtotal?: number | undefined;
    additionalCost?: number | undefined;
    totalCost?: number | undefined;
    endTime?: string | undefined;
}>;
export type ISessionUpdateSchema = TypeOf<typeof sessionUpdateSchema>;
declare const sessionAddDessertSchema: z.ZodObject<{
    dessertId: z.ZodString;
    count: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    dessertId: string;
    count: number;
}, {
    dessertId: string;
    count: number;
}>;
export type ISessionAddDessertSchema = TypeOf<typeof sessionAddDessertSchema>;
declare const _default: {
    sessionId: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    sessionAll: z.ZodObject<{
        page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
        orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: z.ZodOptional<z.ZodString>;
        dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof SessionStatus>>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        pageSize: number;
        orderColumn: "id" | "createdAt";
        orderDirection: import("../utils/order").OrderDirection;
        status?: SessionStatus | undefined;
        search?: string | undefined;
        dateFrom?: Date | undefined;
        dateTo?: Date | undefined;
    }, {
        status?: SessionStatus | undefined;
        search?: string | undefined;
        page?: string | undefined;
        pageSize?: string | undefined;
        orderColumn?: "id" | "createdAt" | undefined;
        orderDirection?: import("../utils/order").OrderDirection | undefined;
        dateFrom?: string | undefined;
        dateTo?: string | undefined;
    }>;
    sessionCreate: z.ZodObject<{
        numberOfPersons: z.ZodNumber;
        username: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        numberOfPersons: number;
        username: string;
    }, {
        numberOfPersons: number;
        username: string;
    }>;
    sessionUpdate: z.ZodObject<{
        numberOfPersons: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof SessionStatus>>;
        subtotal: z.ZodOptional<z.ZodNumber>;
        additionalCost: z.ZodOptional<z.ZodNumber>;
        totalCost: z.ZodOptional<z.ZodNumber>;
        endTime: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    }, "strict", z.ZodTypeAny, {
        status?: SessionStatus | undefined;
        numberOfPersons?: number | undefined;
        subtotal?: number | undefined;
        additionalCost?: number | undefined;
        totalCost?: number | undefined;
        endTime?: Date | undefined;
    }, {
        status?: SessionStatus | undefined;
        numberOfPersons?: number | undefined;
        subtotal?: number | undefined;
        additionalCost?: number | undefined;
        totalCost?: number | undefined;
        endTime?: string | undefined;
    }>;
    sessionAddDessert: z.ZodObject<{
        dessertId: z.ZodString;
        count: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        dessertId: string;
        count: number;
    }, {
        dessertId: string;
        count: number;
    }>;
};
export default _default;
