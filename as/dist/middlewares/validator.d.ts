import { NextFunction, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
export declare enum ValidationSource {
    BODY = "body",
    HEADER = "headers",
    QUERY = "query",
    PARAM = "params"
}
export type ValidProps = {
    query?: AnyZodObject | ZodEffects<AnyZodObject>;
    params?: AnyZodObject | ZodEffects<AnyZodObject>;
    headers?: AnyZodObject | ZodEffects<AnyZodObject>;
    body?: AnyZodObject | ZodEffects<AnyZodObject>;
};
export declare const zodAuthBearer: ZodEffects<import("zod").ZodString, string, string>;
declare const _default: (props: ValidProps) => (req: import("express").Request, res: Response, next: NextFunction) => void;
export default _default;
