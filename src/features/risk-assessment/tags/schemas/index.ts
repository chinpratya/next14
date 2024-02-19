import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const TagSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  createdDt: z.string().optional(),
  createdBy: z.string().optional(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const TagResponseSchema = ResponseSchema.extend({
  data: z.array(TagSchema),
});
