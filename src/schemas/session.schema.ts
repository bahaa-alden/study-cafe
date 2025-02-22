import { SessionStatus } from './../utils/enum';

import { stringToDate } from './common';

import { objectId } from './common';
import { object, z, string, type TypeOf } from 'zod';
import { orderColumn, orderDirection, page, pageSize } from './common';

const sessionIdSchema = object({
  id: objectId,
});

export type ISessionIdSchema = TypeOf<typeof sessionIdSchema>;

const sessionAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
});

export type ISessionAllSchema = TypeOf<typeof sessionAllSchema>;

const sessionCreateSchema = object({
  // <creating-property-create-schema />
  username: z.string(),
}).strict();

export type ISessionCreateSchema = TypeOf<typeof sessionCreateSchema>;

const sessionUpdateSchema = object({
  // <creating-property-update-schema />
  status: z.nativeEnum(SessionStatus).optional(),
  subtotal: z.number().optional(),
  additionalCost: z.number().optional(),
  totalCost: z.number().optional(),
  endTime: stringToDate.optional(),
}).strict();

export type ISessionUpdateSchema = TypeOf<typeof sessionUpdateSchema>;

const sessionEndSchema = object({
  // <creating-property-create-schema />
  additionalCost: z.number().optional(),
}).strict();

export type ISessionEndSchema = TypeOf<typeof sessionEndSchema>;

export default {
  sessionId: sessionIdSchema,
  sessionAll: sessionAllSchema,
  sessionCreate: sessionCreateSchema,
  sessionUpdate: sessionUpdateSchema,
  sessionEnd: sessionEndSchema,
};
