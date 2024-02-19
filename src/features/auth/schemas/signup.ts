import { z } from 'zod';

export const SignupSchema = z.object({
  user: z.object({
    email: z.string().email(),
    password: z.string(),
    attributes: z.object({
      first_name: z.string(),
      last_name: z.string(),
      phone_number: z.string(),
    }),
  }),
  tenant: z.object({
    organization_name: z.string(),
    organization_attributes: z.object({
      organization_type: z.string(),
      organization_employee_size: z.string(),
      organization_short_name: z.string(),
    }),
  }),
});

export const SignupMetaSchema = z.object({
  organizationType: z.array(z.string()),
  organizationEmployeeSize: z.array(z.string()),
});
