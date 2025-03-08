import { Response } from 'express';
export declare class SessionController {
    getSessions: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getSession: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createSession: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updateSession: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deleteSession: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    endSession: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    addDessert: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const sessionController: SessionController;
