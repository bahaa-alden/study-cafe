import { Request, Response, NextFunction } from 'express';
declare const customResponses: (req: Request, res: Response, next: NextFunction) => void;
export default customResponses;
