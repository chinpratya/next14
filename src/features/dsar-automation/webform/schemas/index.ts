import { z } from 'zod';

import {
  ConsentFormSchema,
  ResponseSchema,
} from '@/schema';

export const TimeUsedSchema = z.object({
  unit: z.string(),
  value: z.number(),
});

export const WebFormSchema = z.object({
  webformID: z.string(),
  name: z.string().nullable(),
  description: z.string(),
  activityName: z.array(z.string()),
  groupName: z.array(z.string()),
  tagName: z.array(z.string()),
  language: z.string(),
  identifyType: z.string(),
  isCaptcha: z.boolean(),
  createdDt: z.string(),
  timeused: TimeUsedSchema.optional(),
  status: z.string(),
  version: z.number(),
  updatedDt: z.string().optional(),
});

export const WebFormResponseSchema =
  ResponseSchema.extend({
    data: z.array(WebFormSchema),
  });

export const WebFormActivitySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  groupID: z.string(),
  groupName: z.string(),
  tagName: z.array(z.string()),
  tagID: z.array(z.string()),
});

export const WebFormActivityResponseSchema =
  ResponseSchema.extend({
    data: z.array(WebFormActivitySchema),
  });

export const WebFormUserSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  organization: z.array(z.string()),
  position: z.array(z.string()),
});

export const WebFormUserResponseSchema =
  ResponseSchema.extend({
    data: z.array(WebFormUserSchema),
  });

export const WebFormDetailSchema = z.object({
  name: z.string().nullable(),
  workflowID: z.string(),
  defaultLanguage: z.string(),
  language: z.string(),
  status: z.string(),
  islanguage: z.boolean(),
  isCaptcha: z.boolean(),
  description: z.string().optional(),
  isSentEmail: z.boolean(),
  lifetime: z.number(),
  SentBeforeClose: z.number().optional(),

  tagID: z.array(z.string()),
  tagName: z.array(z.string()),
  identifyType: z.string(),
  createdDt: z.string(),
  updatedDt: z.string(),
  version: z.number(),
  publishDt: z.string(),
});

export const MetaTypeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const WebFormMetaSchema = z.object({
  DefaultLanguage: z.array(MetaTypeSchema),
  Language: z.array(MetaTypeSchema),
  identifyType: z.array(MetaTypeSchema),
});

export const WebFormVersionSchema = z.object({
  version: z.number(),
  publishDt: z.string(),
});

export const WebFormVersionResponseSchema =
  ResponseSchema.extend({
    data: z.array(WebFormVersionSchema),
  });

export const WebFormLanguageListSchema = z.object({
  LanguageID: z.string(),
  LanguageName: z.string(),
});

export const WebformLanguageDetailSchema =
  WebFormLanguageListSchema.extend({
    form: ConsentFormSchema,
  });

export const WebformTemplateSchema = z.object({
  Language: z.string().optional(),
  form: ConsentFormSchema,
});

export const WebformAdminPortalSchema = z.object({
  token: z.string(),
});
