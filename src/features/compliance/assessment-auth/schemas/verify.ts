import { z } from 'zod';

export const VerificationEmailSchema = z.object({
  code: z.string(),
  expiresIn: z.number(),
});

export const VerificationRoleSchema = z.enum([
  'respondent',
  'approver',
  'both',
]);

export const VerificationOtpSchema = z.object({
  AccessToken: z.string(),
  AccessTokenExpiresIn: z.number(),
  RefreshToken: z.string(),
  RefreshTokenExpiresIn: z.number(),
  role: VerificationRoleSchema,
});
