import { Response } from 'express';
export declare class PaymentController {
    getPayments: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getPayment: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createPayment: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updatePayment: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deletePayment: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const paymentController: PaymentController;
