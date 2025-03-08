import { Response } from 'express';
export declare class OrganizationController {
    getOrganizations: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    getOrganization: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    createOrganization: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    updateOrganization: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    deleteOrganization: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    approve: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    refuse: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    statistics: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const organizationController: OrganizationController;
