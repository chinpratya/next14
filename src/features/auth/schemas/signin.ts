import { z } from 'zod';

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string(),
  organization: z.string(),
});

export const AuthenticatedUserSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
  access_role: z.enum(['apps', 'portal']).optional(),
  token_type: z.string().optional(),
  'not-before-policy': z.number().optional(),
  session_state: z.string().optional(),
  scope: z.string().optional(),
  role: z
    .enum(['respondent', 'approver', 'both'])
    .optional(),
  email: z.string().optional(),
  organizationName: z.string().optional(),
  organizationId: z.string().optional(),
});
