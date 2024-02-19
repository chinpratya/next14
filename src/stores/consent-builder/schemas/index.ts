import { z } from 'zod';

export const ConsentBuilderFormSchema = z.object({
  formItems: z.array(z.any()),
  formSetting: z.object({
    page: z.record(z.string(), z.string()),
    form: z.record(z.string(), z.string()),
  }),
});

export const ConsentBuilderFormLanguageSchema = z.object({
  defaultLanguage: z.array(z.string()),
  formTemplate: z.array(
    z.object({
      languageID: z.string(),
      languageName: z.string(),
      formTemplate: ConsentBuilderFormSchema,
    })
  ),
  mainLanguage: z.string(),
});
