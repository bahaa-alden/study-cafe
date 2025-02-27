import { PlanDuration } from './../../utils/enum';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IPlan extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  duration: PlanDuration;
  price: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const planSchema: Schema = new Schema<IPlan>(
  {
    // <creating-property-schema />
    duration: {
      type: String,
      enum: Object.values(PlanDuration),
    },
    price: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      index: 'text',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Plan',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

export default model<IPlan>('Plan', planSchema);
