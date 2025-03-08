import { type ILocalString } from './../../utils/types';
import { IOrganization } from './organization.model';
import mongoose from 'mongoose';
import { DessertType } from './../../utils/enum';
import { type Document as MongooseDocument } from 'mongoose';
export interface IDessert extends MongooseDocument {
    id: string;
    name: ILocalString;
    organizationId?: IOrganization['_id'];
    organization?: IOrganization;
    type: DessertType;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
declare const _default: mongoose.Model<IDessert, {}, {}, {}, mongoose.Document<unknown, {}, IDessert> & IDessert & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
