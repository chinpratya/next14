import { z } from 'zod';

export const PolicyBuilderSectionSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  hide: z.boolean(),
  value: z.string().optional().nullable(),
});
