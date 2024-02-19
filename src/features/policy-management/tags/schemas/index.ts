import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const TagSchema = z.object({
  tagID: z.string(),
  name: z.string(),
  organization: z.string(),
  organizationID: z.string(),
  createdDt: z.string().optional(),
  createdBy: z.string().optional(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const TagResponseSchema = ResponseSchema.extend({
  data: z.array(TagSchema),
});
