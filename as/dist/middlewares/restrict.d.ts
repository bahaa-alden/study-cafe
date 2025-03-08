import { NextFunction, Response, ParsedRequest } from 'express';
import { RoleCode } from '../utils/enum';
declare const _default: (...roleCodes: RoleCode[]) => (req: ParsedRequest, res: Response, next: NextFunction) => void;
export default _default;
