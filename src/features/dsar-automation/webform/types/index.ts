import { z } from 'zod';

import {
  WebFormSchema,
  WebFormResponseSchema,
  WebFormDetailSchema,
  WebFormMetaSchema,
  WebFormVersionSchema,
  WebFormVersionResponseSchema,
  WebFormLanguageListSchema,
  WebformLanguageDetailSchema,
  WebFormActivityResponseSchema,
  WebFormActivitySchema,
  WebFormUserResponseSchema,
  WebFormUserSchema,
  WebformTemplateSchema,
  WebformAdminPortalSchema,
} from '../schemas';

export type WebForm = z.infer<typeof WebFormSchema>;

export type WebFormResponse = z.infer<
  typeof WebFormResponseSchema
>;

export type WebFormUserResponse = z.infer<
  typeof WebFormUserResponseSchema
>;

export type WebFormUser = z.infer<
  typeof WebFormUserSchema
>;

export type WebFormActivityResponse = z.infer<
  typeof WebFormActivityResponseSchema
>;

export type WebFormActivity = z.infer<
  typeof WebFormActivitySchema
>;

export type WebFormDetail = z.infer<
  typeof WebFormDetailSchema
>;

export type WebFormMeta = z.infer<
  typeof WebFormMetaSchema
>;

export type WebFormVersionType = z.infer<
  typeof WebFormVersionSchema
>;

export type WebFormVersionResponse = z.infer<
  typeof WebFormVersionResponseSchema
>;

export type WebFormLanguageList = z.infer<
  typeof WebFormLanguageListSchema
>;

export type WebformLanguageDetail = z.infer<
  typeof WebformLanguageDetailSchema
>;

export type WebformTemplate = z.infer<
  typeof WebformTemplateSchema
>;

export type WebformAdminPortal = z.infer<
  typeof WebformAdminPortalSchema
>;
