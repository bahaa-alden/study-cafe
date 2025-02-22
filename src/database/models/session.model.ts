import { SessionStatus } from './../../utils/enum';

import { IOrganization } from './organization.model';

import { IUser } from './user.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface ISession extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  status?: SessionStatus;

  subtotal?: number;

  additionalCost?: number;

  organizationId: IOrganization['_id'];
  organization: IOrganization;
  userId?: IUser['_id'];
  user?: IUser;

  totalCost?: number;

  endTime?: Date;
  startTime?: Date;
  username?: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  calculateCost(organizationHourlyRate: number): {
    total: number;
    subtotal: number;
  };
}

const sessionSchema: Schema = new Schema<ISession>(
  {
    // <creating-property-schema />
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      default: SessionStatus.started,
    },

    subtotal: {
      type: Number,
    },
    additionalCost: {
      type: Number,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    totalCost: {
      type: Number,
      default: null,
    },
    endTime: {
      type: Date,
    },
    startTime: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      index: 'text',
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Session',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

sessionSchema.methods.calculateCost = function (
  organizationHourlyRate: number,
): { total: number; subtotal: number } {
  const durationInHours =
    (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 3600);
  const subtotal = durationInHours * organizationHourlyRate;
  const total = subtotal + this.additionalCost;
  return { total, subtotal };
};

sessionSchema.virtual('user', {
  localField: 'userId',
  foreignField: '_id',
  ref: 'User',
  justOne: true,
});

sessionSchema.virtual('organization', {
  localField: 'organizationId',
  foreignField: '_id',
  ref: 'Organization',
  justOne: true,
});

export default model<ISession>('Session', sessionSchema);
