import { Response } from 'express';
export declare class SubscriptionOrderController {
    getSubscriptionOrders: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getMine: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getSubscriptionOrder: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createSubscriptionOrder: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updateSubscriptionOrder: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deleteSubscriptionOrder: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    approve: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    refuse: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const subscriptionOrderController: SubscriptionOrderController;
