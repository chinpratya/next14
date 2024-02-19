import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const AgenciesSchema = z.object({
  groupId: z.string(),
  name: z.string(),
  type_group: z.string(),
  name_en: z.string(),
  description: z.string(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string(),
  updated_by: z.string(),
  total_user: z.number(),
  status: z.string().optional(),
  abbreviation_en: z.string().optional(),
  abbreviation_th: z.string().optional(),
  agenciesID: z.string().optional(),
});

export const AgenciesResponseSchema =
  ResponseSchema.extend({
    data: z.array(AgenciesSchema),
  });
