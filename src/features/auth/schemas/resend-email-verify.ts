import { z } from 'zod';

export const ResendEmailVerifySchema = z.object({
  user_id: z.string(),
  organization_short_name: z.string(),
  lifespan: z.number(),
});

export const ResendEmailVerifyResponseSchema = z.object({
  message: z.string(),
  code: z.number(),
});
