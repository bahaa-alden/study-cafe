import { SubscriptionStatus } from './../../utils/enum';
import { IPlan } from './plan.model';
import { IOrganization } from './organization.model';
import mongoose from 'mongoose';
import { type Document as MongooseDocument } from 'mongoose';
import { IPayment } from './payment.model';
export interface ISubscription extends MongooseDocument {
    id: string;
    expiresDate: Date;
    startsDate?: Date;
    status: SubscriptionStatus;
    planId: IPlan['_id'];
    plan: IPlan;
    organizationId: IOrganization['_id'];
    organization: IOrganization;
    payment: IPayment;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
declare const _default: mongoose.Model<ISubscription, {}, {}, {}, mongoose.Document<unknown, {}, ISubscription> & ISubscription & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
