import { z } from 'zod';

import { ResponseSchema, EntitySchema } from '@/schema';

export const MaturityModelDetailSchema = z.object({
  ObjectUUID: z.string(),
  columnName: z.string(),
  columnDetail: z.string(),
  icon: z.string(),
  description: z.string(),
});

export const MaturityModelSchema = EntitySchema.extend({
  name: z.string(),
  modelType: z.string(),
  numberOfWebformAvailable: z.number(),
  description: z.string(),
  detail: z.array(MaturityModelDetailSchema).optional(),
});

export const ListMaturityModelSchema =
  ResponseSchema.extend({
    data: z.array(MaturityModelSchema),
  });
