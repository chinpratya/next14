import { z } from 'zod';

export const MetaTypeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const WebFormMetaSchema = z.object({
  DefaultLanguage: z.array(MetaTypeSchema),
  Language: z.array(MetaTypeSchema),
  identifyType: z.array(MetaTypeSchema),
});
