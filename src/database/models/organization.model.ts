import { OrgStatus } from './../../utils/enum';

import { IUser } from './user.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IOrganization extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  status?: OrgStatus;

  userId?: IUser['_id'];
  user?: IUser;

  sessionHourlyRate: number;

  name: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const organizationSchema: Schema = new Schema<IOrganization>(
  {
    // <creating-property-schema />
    status: {
      type: String,
      enum: Object.values(OrgStatus),
      default: OrgStatus.pending,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionHourlyRate: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      index: 'text',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Organization',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

export default model<IOrganization>('Organization', organizationSchema);
