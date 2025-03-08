export declare class AuthorizationMiddleware {
    authorization: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
}
export declare const authorizationMiddleware: AuthorizationMiddleware;
