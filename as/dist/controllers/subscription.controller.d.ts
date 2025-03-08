import { Response } from 'express';
export declare class SubscriptionController {
    getSubscriptions: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getSubscription: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createSubscription: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updateSubscription: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deleteSubscription: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getMine: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const subscriptionController: SubscriptionController;
