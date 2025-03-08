import { Response } from 'express';
export declare class PlanController {
    getPlans: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getPlan: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createPlan: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updatePlan: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deletePlan: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const planController: PlanController;
