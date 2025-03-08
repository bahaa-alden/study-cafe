import { DessertType } from './../utils/enum';
import { z, type TypeOf } from 'zod';
declare const dessertIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type IDessertIdSchema = TypeOf<typeof dessertIdSchema>;
declare const dessertAllSchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof DessertType>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    orderColumn: "id" | "createdAt";
    orderDirection: import("../utils/order").OrderDirection;
    type?: DessertType | undefined;
    search?: string | undefined;
}, {
    type?: DessertType | undefined;
    search?: string | undefined;
    page?: string | undefined;
    pageSize?: string | undefined;
    orderColumn?: "id" | "createdAt" | undefined;
    orderDirection?: import("../utils/order").OrderDirection | undefined;
}>;
export type IDessertAllSchema = TypeOf<typeof dessertAllSchema>;
declare const dessertCreateSchema: z.ZodObject<{
    name: z.ZodObject<{
        ar: z.ZodOptional<z.ZodString>;
        en: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ar?: string | undefined;
        en?: string | undefined;
    }, {
        ar?: string | undefined;
        en?: string | undefined;
    }>;
    type: z.ZodNativeEnum<typeof DessertType>;
    price: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: DessertType;
    name: {
        ar?: string | undefined;
        en?: string | undefined;
    };
    price: number;
}, {
    type: DessertType;
    name: {
        ar?: string | undefined;
        en?: string | undefined;
    };
    price: number;
}>;
export type IDessertCreateSchema = TypeOf<typeof dessertCreateSchema>;
declare const dessertUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodObject<{
        ar: z.ZodOptional<z.ZodString>;
        en: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ar?: string | undefined;
        en?: string | undefined;
    }, {
        ar?: string | undefined;
        en?: string | undefined;
    }>>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof DessertType>>;
    price: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type?: DessertType | undefined;
    name?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
    price?: number | undefined;
}, {
    type?: DessertType | undefined;
    name?: {
        ar?: string | undefined;
        en?: string | undefined;
    } | undefined;
    price?: number | undefined;
}>;
export type IDessertUpdateSchema = TypeOf<typeof dessertUpdateSchema>;
declare const _default: {
    dessertId: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    dessertAll: z.ZodObject<{
        page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
        orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodNativeEnum<typeof DessertType>>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        pageSize: number;
        orderColumn: "id" | "createdAt";
        orderDirection: import("../utils/order").OrderDirection;
        type?: DessertType | undefined;
        search?: string | undefined;
    }, {
        type?: DessertType | undefined;
        search?: string | undefined;
        page?: string | undefined;
        pageSize?: string | undefined;
        orderColumn?: "id" | "createdAt" | undefined;
        orderDirection?: import("../utils/order").OrderDirection | undefined;
    }>;
    dessertCreate: z.ZodObject<{
        name: z.ZodObject<{
            ar: z.ZodOptional<z.ZodString>;
            en: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            ar?: string | undefined;
            en?: string | undefined;
        }, {
            ar?: string | undefined;
            en?: string | undefined;
        }>;
        type: z.ZodNativeEnum<typeof DessertType>;
        price: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: DessertType;
        name: {
            ar?: string | undefined;
            en?: string | undefined;
        };
        price: number;
    }, {
        type: DessertType;
        name: {
            ar?: string | undefined;
            en?: string | undefined;
        };
        price: number;
    }>;
    dessertUpdate: z.ZodObject<{
        name: z.ZodOptional<z.ZodObject<{
            ar: z.ZodOptional<z.ZodString>;
            en: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            ar?: string | undefined;
            en?: string | undefined;
        }, {
            ar?: string | undefined;
            en?: string | undefined;
        }>>;
        type: z.ZodOptional<z.ZodNativeEnum<typeof DessertType>>;
        price: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type?: DessertType | undefined;
        name?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
        price?: number | undefined;
    }, {
        type?: DessertType | undefined;
        name?: {
            ar?: string | undefined;
            en?: string | undefined;
        } | undefined;
        price?: number | undefined;
    }>;
};
export default _default;
