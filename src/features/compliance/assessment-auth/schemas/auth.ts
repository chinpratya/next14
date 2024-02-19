import { z } from 'zod';

export const RefreshTokenSchema = z.object({
  AccessToken: z.string(),
  AccessTokenExpiresIn: z.number(),
  RefreshToken: z.string(),
  RefreshTokenExpiresIn: z.number(),
  role: z
    .enum(['respondent', 'approver', 'both'])
    .optional(),
});
