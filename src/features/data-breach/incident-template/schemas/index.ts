import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const IncidentTemplateSchema = EntitySchema.extend(
  {
    templateeventID: z.string(),
    name: z.string(),
    description: z.string().optional(),
    status: z.string().optional(),
  }
);

export const IncidentTemplateResponseSchema =
  ResponseSchema.extend({
    data: z.array(IncidentTemplateSchema),
  });

export const IncidentTemplateEventFormSchema = z.object({
  isSentTemplate: z.boolean().optional(),
  formSetting: z.object({
    headerLogo: z.string(),
    headerColor: z.string(),
  }),
  formSection: z.object({
    htmlValue: z.string(),
  }),
});
