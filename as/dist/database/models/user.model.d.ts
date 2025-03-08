import { RoleCode, UserStatus } from './../../utils/enum';
import { type Document as MongooseDocument } from 'mongoose';
import { Error } from 'mongoose';
export interface IUser extends MongooseDocument {
    id: string;
    status?: UserStatus;
    name: string;
    email: string;
    password: string;
    role: RoleCode;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;
    comparePassword(candidatePassword: string, callback: (err: Error, isMatch: boolean) => void): void;
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, MongooseDocument<unknown, {}, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default _default;
