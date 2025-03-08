import { IDessert } from './dessert.model';
import { SessionStatus } from './../../utils/enum';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';
import mongoose from 'mongoose';
import { type Document as MongooseDocument } from 'mongoose';
export interface ISession extends MongooseDocument {
    id: string;
    numberOfPersons: number;
    desserts: Array<{
        dessertId: IDessert['_id'];
        dessert: IDessert;
        count: number;
    }>;
    status?: SessionStatus;
    subtotal?: number;
    additionalCost: number;
    organizationId: IOrganization['_id'];
    organization: IOrganization;
    userId?: IUser['_id'];
    user?: IUser;
    totalCost?: number;
    endTime: Date;
    startTime: Date;
    username?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    calculateCost(organizationHourlyRate: number): {
        total: number;
        subtotal: number;
    };
}
declare const _default: mongoose.Model<ISession, {}, {}, {}, mongoose.Document<unknown, {}, ISession> & ISession & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
