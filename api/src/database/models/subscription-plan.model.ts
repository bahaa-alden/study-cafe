import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface ISubscriptionPlan extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const subscriptionPlanSchema: Schema = new Schema<ISubscriptionPlan>(
  {
    // <creating-property-schema />
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'SubscriptionPlan',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

export default model<ISubscriptionPlan>(
  'SubscriptionPlan',
  subscriptionPlanSchema,
);
