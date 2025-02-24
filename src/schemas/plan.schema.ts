import { PlanDuration } from './../utils/enum';

import { object, z, string, type TypeOf } from 'zod';
import {
  objectId,
  orderColumn,
  orderDirection,
  page,
  pageSize,
} from './common';

const planIdSchema = object({
  id: objectId,
});

export type IPlanIdSchema = TypeOf<typeof planIdSchema>;

const planAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type IPlanAllSchema = TypeOf<typeof planAllSchema>;

const planCreateSchema = object({
  // <creating-property-create-schema />
  duration: z.nativeEnum(PlanDuration),

  price: z.number(),

  title: z.string(),
}).strict();

export type IPlanCreateSchema = TypeOf<typeof planCreateSchema>;

const planUpdateSchema = object({
  // <creating-property-update-schema />
  duration: z.nativeEnum(PlanDuration).optional(),

  price: z.number().optional(),

  title: z.string().optional(),
}).strict();

export type IPlanUpdateSchema = TypeOf<typeof planUpdateSchema>;

export default {
  planId: planIdSchema,
  planAll: planAllSchema,
  planCreate: planCreateSchema,
  planUpdate: planUpdateSchema,
};
