import { z } from 'zod';

import { ResponseSchema } from '@/schema';

import { TaskListSchema } from '../../task';

export const SlaStatusSchema = z.enum([
  'highest',
  'high',
  'normal',
  'low',
  'lower',
]);

export const ProcessStatusSchema = z.enum([
  'open',
  'inprogress',
  'close',
  'reject',
]);

export const IncidentDetailSchema = z.object({
  type: z.string().optional(),
  prefix: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  devices: z.array(z.string()).optional(),
  ip_category: z.string().optional(),
  ip_address: z.string().optional(),
});

export const TagSchema = z.object({
  object_uuid: z.string(),
  name: z.string(),
});

export const IncidentSchema = z.object({
  ObjectID: z.string(),
  name: z.string(),
  category: z.string(),
  sub_category: z.string(),
  type: z.string(),
  tag: z.array(TagSchema),
  sla_status: SlaStatusSchema,
  detail: IncidentDetailSchema,
  estimate_time: z.string().optional(),
  status: ProcessStatusSchema.optional(),
  task: z.array(TaskListSchema),
  createdDt: z.string(),
  endDt: z.string(),
});

export const IncidentListResponseSchema =
  ResponseSchema.extend({
    data: z.array(IncidentSchema),
  });
