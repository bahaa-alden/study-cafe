import { z } from 'zod';
import { OrderDirection } from '../utils/order';
export declare const numericId: z.ZodEffects<z.ZodString, number, string>;
export declare const objectId: z.ZodString;
export declare const referenceId: z.ZodString;
export declare const positiveInteger: z.ZodEffects<z.ZodString, number, string>;
export declare const uuid: z.ZodString;
export declare const page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
export declare const pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
export declare const orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
export declare const orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof OrderDirection>>>;
export declare const localString: z.ZodObject<{
    ar: z.ZodOptional<z.ZodString>;
    en: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ar?: string | undefined;
    en?: string | undefined;
}, {
    ar?: string | undefined;
    en?: string | undefined;
}>;
export declare const stringToDate: z.ZodEffects<z.ZodString, Date, string>;
