import { z } from 'zod';

export const ConsentBuilderPreferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string().optional(),
  attributeTypeID: z.string(),
  choices: z.array(z.string()),
});

export const ConsentBuilderPurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  type: z.string().optional(),
  description: z.string(),
  displayType: z.string(),
  preferences: z.array(ConsentBuilderPreferenceSchema),
});
