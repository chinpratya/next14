import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema/response';

export const WhitelistSchema = z.object({
  id: z.string(),
  organization: z.string(),
  target: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  created_date: z.string(),
  created_by: z.string(),
});

export const WhitelistResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(WhitelistSchema),
  });
