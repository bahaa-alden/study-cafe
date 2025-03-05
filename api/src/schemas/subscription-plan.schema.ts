import { object, z, string, type TypeOf } from 'zod';
import {
  objectId,
  orderColumn,
  orderDirection,
  page,
  pageSize,
} from './common';

const subscriptionPlanIdSchema = object({
  id: objectId,
});

export type ISubscriptionPlanIdSchema = TypeOf<typeof subscriptionPlanIdSchema>;

const subscriptionPlanAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type ISubscriptionPlanAllSchema = TypeOf<
  typeof subscriptionPlanAllSchema
>;

const subscriptionPlanCreateSchema = object({
  // <creating-property-create-schema />
}).strict();

export type ISubscriptionPlanCreateSchema = TypeOf<
  typeof subscriptionPlanCreateSchema
>;

const subscriptionPlanUpdateSchema = object({
  // <creating-property-update-schema />
}).strict();

export type ISubscriptionPlanUpdateSchema = TypeOf<
  typeof subscriptionPlanUpdateSchema
>;

export default {
  subscriptionPlanId: subscriptionPlanIdSchema,
  subscriptionPlanAll: subscriptionPlanAllSchema,
  subscriptionPlanCreate: subscriptionPlanCreateSchema,
  subscriptionPlanUpdate: subscriptionPlanUpdateSchema,
};
