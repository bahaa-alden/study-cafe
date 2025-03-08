import { Response } from 'express';
import { ZodIssue } from 'zod';
export declare enum ErrorType {
    BAD_TOKEN = "BadTokenError",
    TOKEN_EXPIRED = "TokenExpiredError",
    UNAUTHORIZED = "AuthFailureError",
    ACCESS_TOKEN = "AccessTokenError",
    INTERNAL = "InternalError",
    NOT_FOUND = "NotFoundError",
    NO_ENTRY = "NoEntryError",
    NO_DATA = "NoDataError",
    BAD_REQUEST = "BadRequestError",
    FORBIDDEN = "ForbiddenError",
    UNPROCESSABLE = "UnprocessableEntityError",
    CONFLICT = "ConflictError"
}
export declare abstract class ApiError extends Error {
    type: ErrorType;
    message: string;
    errors?: ZodIssue[] | undefined;
    constructor(type: ErrorType, message?: string, errors?: ZodIssue[] | undefined);
    static handle(err: ApiError, res: Response): Response;
}
export declare class AuthFailureError extends ApiError {
    constructor(message?: string);
}
export declare class InternalError extends ApiError {
    constructor(message?: string);
}
export declare class UnprocessableEntityError extends ApiError {
    constructor(message?: string);
}
export declare class BadRequestError extends ApiError {
    constructor(message?: string, errors?: ZodIssue[]);
}
export declare class ConflictError extends ApiError {
    constructor(message?: string);
}
export declare class NotFoundError extends ApiError {
    constructor(message?: string);
}
export declare class ForbiddenError extends ApiError {
    constructor(message?: string);
}
export declare class NoEntryError extends ApiError {
    constructor(message?: string);
}
export declare class BadTokenError extends ApiError {
    constructor(message?: string);
}
export declare class TokenExpiredError extends ApiError {
    constructor(message?: string);
}
export declare class NoDataError extends ApiError {
    constructor(message?: string);
}
export declare class AccessTokenError extends ApiError {
    constructor(message?: string);
}
