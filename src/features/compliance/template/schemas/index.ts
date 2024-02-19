import { z } from 'zod';

export const TemplateSettingEmailSchema = z.object({
  header: z
    .object({
      showLogo: z.boolean().optional(),
      logo: z.string().optional(),
      backgroundColor: z.string().optional(),
    })
    .optional(),
  footer: z.object({
    showLogo: z.boolean().optional(),
    logo: z.string().optional(),
    backgroundColor: z.string().optional(),
    content: z.string().optional(),
  }),
  button: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
  }),
});

export const TemplateSettingPortalSchema = z.object({
  header: z
    .object({
      showLogo: z.boolean().optional(),
      logo: z.string().optional(),
    })
    .optional(),
  background: z.string().optional(),
  button: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
  }),
});

export const TemplateSettingSchema = z.object({
  email: TemplateSettingEmailSchema.optional(),
  portal: TemplateSettingPortalSchema.optional(),
});
