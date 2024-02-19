import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const InitPasswordSchema = z.object({
  password_type: z.string(),
  password: z.string().optional(),
  temporary: z.boolean().optional(),
});
export const InitDataPasswordSchema = z.object({
  internal: InitPasswordSchema,
  external: InitPasswordSchema,
});

export const InitPasswordResponseSchema =
  ResponseSchema.extend({
    data: InitDataPasswordSchema,
  });
