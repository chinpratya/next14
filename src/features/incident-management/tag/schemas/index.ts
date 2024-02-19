import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const TagSchemaIncident = z.object({
  // tagID: z.string().optional(),
  // name: z.string().optional(),
  // organization: z.string().optional(),
  // organizationId: z.string().optional(),
  // createdDt: z.string().optional(),
  // createdBy: z.string().optional(),
  // updatedDt: z.string().optional(),
  // updatedBy: z.string().optional(),
  objectUuid: z.string(),
  createdAt: z.string().optional(),
  createdBy: z.string().optional(),
  updatedAt: z.string().optional(),
  updatedBy: z.string().optional(),
  name: z.string(),
  organization: z.string(),
  organizationId: z.string(),
});

export const TagResponseSchema = ResponseSchema.extend({
  data: z.array(TagSchemaIncident),
});
