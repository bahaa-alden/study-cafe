import { type ILocalString } from './../../utils/types';
import { PlanDuration } from './../../utils/enum';
import { type Document as MongooseDocument } from 'mongoose';
export interface IPlan extends MongooseDocument {
    id: string;
    description?: ILocalString;
    title: ILocalString;
    duration: PlanDuration;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
declare const _default: import("mongoose").Model<IPlan, {}, {}, {}, MongooseDocument<unknown, {}, IPlan> & IPlan & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default _default;
