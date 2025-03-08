import { IOrganization } from './organization.model';
import { PaymentStatus } from './../../utils/enum';
import { ISubscription } from './subscription.model';
import mongoose from 'mongoose';
import { type Document as MongooseDocument } from 'mongoose';
export interface IPayment extends MongooseDocument {
    id: string;
    organizationId?: IOrganization['_id'];
    organization?: IOrganization;
    status?: PaymentStatus;
    amount: number;
    subscriptionId: ISubscription['_id'];
    subscription: ISubscription;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
declare const _default: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment> & IPayment & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
