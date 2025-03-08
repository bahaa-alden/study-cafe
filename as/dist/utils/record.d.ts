import { ConflictError, NotFoundError } from '../core/ApiError';
export declare const needRecord: <T>(record?: T | null, err?: NotFoundError) => T;
export declare const existRecord: <T>(record?: T | null, err?: ConflictError) => void;
