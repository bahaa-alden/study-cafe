import { Response } from 'express';
import { ZodIssue } from 'zod';
declare enum StatusCode {
    SUCCESS = "10000",
    FAILURE = "10001",
    RETRY = "10002",
    INVALID_ACCESS_TOKEN = "10003",
    CREATED = "10004"
}
declare enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_ERROR = 500,
    UNPROCESSABLE_ENTITY = 422
}
declare abstract class ApiResponse {
    protected statusCode: StatusCode;
    protected status: ResponseStatus;
    protected message?: string | undefined;
    protected errors?: ZodIssue[] | undefined;
    type: 'form' | 'default';
    constructor(statusCode: StatusCode, status: ResponseStatus, message?: string | undefined, errors?: ZodIssue[] | undefined);
    protected prepare<T extends ApiResponse>(res: Response, response: T, headers: {
        [key: string]: string;
    }): Response;
    send(res: Response, headers?: {
        [key: string]: string;
    }): Response;
    private static sanitize;
}
export declare class AuthFailureResponse extends ApiResponse {
    constructor(message?: string);
}
export declare class NotFoundResponse extends ApiResponse {
    constructor(message?: string);
    send(res: Response, headers?: {
        [key: string]: string;
    }): Response;
}
export declare class ForbiddenResponse extends ApiResponse {
    constructor(message?: string);
}
export declare class UnprocessableEntityResponse extends ApiResponse {
    constructor(message?: string);
}
export declare class BadRequestResponse extends ApiResponse {
    constructor(message?: string, errors?: ZodIssue[]);
}
export declare class ConflictResponse extends ApiResponse {
    constructor(message?: string);
}
export declare class InternalErrorResponse extends ApiResponse {
    constructor(message?: string);
}
export declare class SuccessMsgResponse extends ApiResponse {
    constructor(message: string);
}
export declare class CreatedMsgResponse extends ApiResponse {
    constructor(message: string);
}
export declare class NoContentMsgResponse<T> extends ApiResponse {
    constructor(message?: string);
}
export declare class FailureMsgResponse extends ApiResponse {
    constructor(message: string);
}
export declare class SuccessResponse<T> extends ApiResponse {
    private data;
    constructor(message: string, data: T);
    send(res: Response, headers?: {
        [key: string]: string;
    }): Response;
}
export declare class CreatedResponse<T> extends ApiResponse {
    private data;
    constructor(message: string, data: T);
    send(res: Response, headers?: {
        [key: string]: string;
    }): Response;
}
export {};
