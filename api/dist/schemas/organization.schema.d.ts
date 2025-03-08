import { OrgStatus } from './../utils/enum';
import { z, type TypeOf } from 'zod';
declare const organizationIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type IOrganizationIdSchema = TypeOf<typeof organizationIdSchema>;
declare const organizationStatisticsSchema: z.ZodObject<{
    fromDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    toDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
}, "strip", z.ZodTypeAny, {
    fromDate?: Date | undefined;
    toDate?: Date | undefined;
}, {
    fromDate?: string | undefined;
    toDate?: string | undefined;
}>;
export type IOrganizationStatisticsSchema = TypeOf<typeof organizationStatisticsSchema>;
declare const organizationAllSchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
    orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
    search: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof OrgStatus>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    orderColumn: "id" | "createdAt";
    orderDirection: import("../utils/order").OrderDirection;
    status?: OrgStatus | undefined;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
}, {
    status?: OrgStatus | undefined;
    search?: string | undefined;
    page?: string | undefined;
    pageSize?: string | undefined;
    orderColumn?: "id" | "createdAt" | undefined;
    orderDirection?: import("../utils/order").OrderDirection | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
}>;
export type IOrganizationAllSchema = TypeOf<typeof organizationAllSchema>;
declare const organizationCreateSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    sessionHourlyRate: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
    userId?: string | undefined;
    sessionHourlyRate?: number | undefined;
}, {
    name: string;
    userId?: string | undefined;
    sessionHourlyRate?: number | undefined;
}>;
export type IOrganizationCreateSchema = TypeOf<typeof organizationCreateSchema>;
declare const organizationUpdateSchema: z.ZodObject<{
    sessionHourlyRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    name: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    sessionHourlyRate?: number | undefined;
}, {
    name?: string | undefined;
    sessionHourlyRate?: number | undefined;
}>;
export type IOrganizationUpdateSchema = TypeOf<typeof organizationUpdateSchema>;
declare const organizationHeaderSchema: z.ZodObject<{
    'organization-id': z.ZodString;
}, "strip", z.ZodTypeAny, {
    'organization-id': string;
}, {
    'organization-id': string;
}>;
export type IOrganizationHeaderSchema = TypeOf<typeof organizationHeaderSchema>;
declare const _default: {
    organizationId: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    organizationAll: z.ZodObject<{
        page: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        pageSize: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>>, number, string | undefined>;
        orderColumn: z.ZodDefault<z.ZodOptional<z.ZodEnum<["id", "createdAt"]>>>;
        orderDirection: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof import("../utils/order").OrderDirection>>>;
        search: z.ZodOptional<z.ZodString>;
        dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof OrgStatus>>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        pageSize: number;
        orderColumn: "id" | "createdAt";
        orderDirection: import("../utils/order").OrderDirection;
        status?: OrgStatus | undefined;
        search?: string | undefined;
        dateFrom?: Date | undefined;
        dateTo?: Date | undefined;
    }, {
        status?: OrgStatus | undefined;
        search?: string | undefined;
        page?: string | undefined;
        pageSize?: string | undefined;
        orderColumn?: "id" | "createdAt" | undefined;
        orderDirection?: import("../utils/order").OrderDirection | undefined;
        dateFrom?: string | undefined;
        dateTo?: string | undefined;
    }>;
    organizationCreate: z.ZodObject<{
        userId: z.ZodOptional<z.ZodString>;
        sessionHourlyRate: z.ZodOptional<z.ZodNumber>;
        name: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        name: string;
        userId?: string | undefined;
        sessionHourlyRate?: number | undefined;
    }, {
        name: string;
        userId?: string | undefined;
        sessionHourlyRate?: number | undefined;
    }>;
    organizationUpdate: z.ZodObject<{
        sessionHourlyRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        name?: string | undefined;
        sessionHourlyRate?: number | undefined;
    }, {
        name?: string | undefined;
        sessionHourlyRate?: number | undefined;
    }>;
    organizationHeader: z.ZodObject<{
        'organization-id': z.ZodString;
    }, "strip", z.ZodTypeAny, {
        'organization-id': string;
    }, {
        'organization-id': string;
    }>;
    organizationStatistics: z.ZodObject<{
        fromDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
        toDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    }, "strip", z.ZodTypeAny, {
        fromDate?: Date | undefined;
        toDate?: Date | undefined;
    }, {
        fromDate?: string | undefined;
        toDate?: string | undefined;
    }>;
};
export default _default;
