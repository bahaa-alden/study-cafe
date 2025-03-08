import { SubscriptionOrderStatus } from './../../utils/enum';
import { IOrganization } from './organization.model';
import { IPlan } from './plan.model';
import mongoose from 'mongoose';
import { type Document as MongooseDocument } from 'mongoose';
export interface ISubscriptionOrder extends MongooseDocument {
    id: string;
    status?: SubscriptionOrderStatus;
    organizationId: IOrganization['_id'];
    organization: IOrganization;
    planId: IPlan['_id'];
    plan: IPlan;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
declare const _default: mongoose.Model<ISubscriptionOrder, {}, {}, {}, mongoose.Document<unknown, {}, ISubscriptionOrder> & ISubscriptionOrder & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
