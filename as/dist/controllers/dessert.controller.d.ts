import { Response } from 'express';
export declare class DessertController {
    getDesserts: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getDessert: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createDessert: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updateDessert: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deleteDessert: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const dessertController: DessertController;
