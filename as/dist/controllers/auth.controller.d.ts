import { NextFunction, ParsedRequest, Request, Response } from 'express';
import '../auth/passportHandler';
import { ICredentialSchema } from '../schemas/auth.schema';
export declare class AuthController {
    registerUser: (req: Request, res: Response, next: NextFunction) => void;
    authenticateUser(req: ParsedRequest<ICredentialSchema>, res: Response, next: NextFunction): void;
    me(req: Request, res: Response, next: NextFunction): void;
    forgotPassword: (req: Request, res: Response, next: NextFunction) => void;
    resetPassword: (req: Request, res: Response, next: NextFunction) => void;
    updateMyPassword: (req: Request, res: Response, next: NextFunction) => void;
}
export declare const authController: AuthController;
