import { z } from 'zod';

export const LanguageSchema = z.object({
  languageID: z.string(),
  languageName: z.string(),
});

export const MetaSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});
