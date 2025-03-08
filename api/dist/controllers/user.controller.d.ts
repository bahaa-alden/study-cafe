import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    me(req: Request, res: Response, next: NextFunction): void;
    updateMe: (req: Request, res: Response, next: NextFunction) => void;
    deleteMe: (req: Request, res: Response, next: NextFunction) => void;
    get: (req: Request, res: Response, next: NextFunction) => void;
    getOne: (req: Request, res: Response, next: NextFunction) => void;
    updateOne: (req: Request, res: Response, next: NextFunction) => void;
    deleteOne: (req: Request, res: Response, next: NextFunction) => void;
}
export declare const userController: UserController;
