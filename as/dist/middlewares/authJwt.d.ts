import { NextFunction, Request, Response } from 'express';
import '../auth/passportHandler';
export declare class AuthMiddleware {
    authenticateJWT(req: Request, res: Response, next: NextFunction): void;
}
export declare const authMiddleware: AuthMiddleware;
