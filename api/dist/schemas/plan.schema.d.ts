import { PlanDuration } from './../utils/enum';
import { z, type TypeOf } from 'zod';
declare const planIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type IPlanIdSchema = TypeOf<typeof planIdSchema>;
declare const planAllSchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    orderColumn: "id" | "createdAt";
    orderDirection: import("../utils/order").OrderDirection;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
}, {
    search?: string | undefined;
    page?: string | undefined;
    pageSize?: string | undefined;
    orderColumn?: "id" | "createdAt" | undefined;
    orderDirection?: import("../utils/order").OrderDirection | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
}>;
export type IPlanAllSchema = TypeOf<typeof planAllSchema>;
declare const planCreateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodObject<{
        ar: z.ZodOptional<z.ZodString>;
        en: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ar?: string | undefined;
        en?: string | undefined;
    }, {
        ar?: string | undefined;
        en?: string | undefined;
    }>>;
    title: z.ZodObject<{
        ar: z.ZodOptional<z.ZodString>;
        en: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ar?: string | undefined;
        en?: string | undefined;
    }, {
        ar?: string | undefined;
        en?: string | undefined;
    }>;
    duration: z.ZodNativeEnum<typeof PlanDuration>;
    price: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    title: {
        ar?: string | undefined;
        en?: string | undefined;
    };
    duration: PlanDuration;
    price: number;
    description?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
}, {
    title: {
        ar?: string | undefined;
        en?: string | undefined;
    };
    duration: PlanDuration;
    price: number;
    description?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
}>;
export type IPlanCreateSchema = TypeOf<typeof planCreateSchema>;
declare const planUpdateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodObject<{
        ar: z.ZodOptional<z.ZodString>;
        en: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ar?: string | undefined;
        en?: string | undefined;
    }, {
        ar?: string | undefined;
        en?: string | undefined;
    }>>;
    title: z.ZodOptional<z.ZodObject<{
        ar: z.ZodOptional<z.ZodString>;
        en: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ar?: string | undefined;
        en?: string | undefined;
    }, {
        ar?: string | undefined;
        en?: string | undefined;
    }>>;
    duration: z.ZodOptional<z.ZodNativeEnum<typeof PlanDuration>>;
    price: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    description?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
    title?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
    duration?: PlanDuration | undefined;
    price?: number | undefined;
}, {
    description?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
    title?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
    duration?: PlanDuration | undefined;
    price?: number | undefined;
}>;
export type IPlanUpdateSchema = TypeOf<typeof planUpdateSchema>;
declare const _default: {
    planId: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    planAll: z.ZodObject<{
        page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
        orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: z.ZodOptional<z.ZodString>;
        dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        pageSize: number;
        orderColumn: "id" | "createdAt";
        orderDirection: import("../utils/order").OrderDirection;
        search?: string | undefined;
        dateFrom?: Date | undefined;
        dateTo?: Date | undefined;
    }, {
        search?: string | undefined;
        page?: string | undefined;
        pageSize?: string | undefined;
        orderColumn?: "id" | "createdAt" | undefined;
        orderDirection?: import("../utils/order").OrderDirection | undefined;
        dateFrom?: string | undefined;
        dateTo?: string | undefined;
    }>;
    planCreate: z.ZodObject<{
        description: z.ZodOptional<z.ZodObject<{
            ar: z.ZodOptional<z.ZodString>;
            en: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            ar?: string | undefined;
            en?: string | undefined;
        }, {
            ar?: string | undefined;
            en?: string | undefined;
        }>>;
        title: z.ZodObject<{
            ar: z.ZodOptional<z.ZodString>;
            en: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            ar?: string | undefined;
            en?: string | undefined;
        }, {
            ar?: string | undefined;
            en?: string | undefined;
        }>;
        duration: z.ZodNativeEnum<typeof PlanDuration>;
        price: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        title: {
            ar?: string | undefined;
            en?: string | undefined;
        };
        duration: PlanDuration;
        price: number;
        description?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
    }, {
        title: {
            ar?: string | undefined;
            en?: string | undefined;
        };
        duration: PlanDuration;
        price: number;
        description?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
    }>;
    planUpdate: z.ZodObject<{
        description: z.ZodOptional<z.ZodObject<{
            ar: z.ZodOptional<z.ZodString>;
            en: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            ar?: string | undefined;
            en?: string | undefined;
        }, {
            ar?: string | undefined;
            en?: string | undefined;
        }>>;
        title: z.ZodOptional<z.ZodObject<{
            ar: z.ZodOptional<z.ZodString>;
            en: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            ar?: string | undefined;
            en?: string | undefined;
        }, {
            ar?: string | undefined;
            en?: string | undefined;
        }>>;
        duration: z.ZodOptional<z.ZodNativeEnum<typeof PlanDuration>>;
        price: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        description?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
        title?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
        duration?: PlanDuration | undefined;
        price?: number | undefined;
    }, {
        description?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
        title?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
        duration?: PlanDuration | undefined;
        price?: number | undefined;
    }>;
};
export default _default;
