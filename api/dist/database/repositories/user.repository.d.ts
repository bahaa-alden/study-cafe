import { BaseRepository, FindOptions } from './base.repository';
import { OrderOptions } from '../../utils/order';
import { IUser } from '../models/user.model';
import { RoleCode } from '../../utils/enum';
export interface UserOrderOptions extends OrderOptions {
    column: string;
}
export interface UserFilterOptions {
    dateFrom?: Date;
    dateTo?: Date;
    role?: RoleCode;
}
export interface FindUserOptions extends FindOptions<UserFilterOptions> {
    order: UserOrderOptions;
}
export declare class UserRepository extends BaseRepository<IUser> {
    constructor();
    findForUser(options: FindUserOptions): Promise<IUser[]>;
    exists(email: string): Promise<boolean>;
    existsName(name: string): Promise<boolean>;
    findPrivateProfileById(id: string): Promise<IUser | null>;
    findOneById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findByUsername(name: string): Promise<IUser | null>;
}
export declare const userRepository: UserRepository;
