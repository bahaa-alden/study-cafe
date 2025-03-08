import { ISubscription } from './subscription.model';
import { OrgStatus } from './../../utils/enum';
import { IUser } from './user.model';
import mongoose from 'mongoose';
import { type Document as MongooseDocument } from 'mongoose';
export interface IOrganization extends MongooseDocument {
    id: string;
    recentSubscriptionId?: ISubscription['_id'];
    recentSubscription?: ISubscription;
    status?: OrgStatus;
    userId?: IUser['_id'];
    user?: IUser;
    sessionHourlyRate: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
declare const _default: mongoose.Model<IOrganization, {}, {}, {}, mongoose.Document<unknown, {}, IOrganization> & IOrganization & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
