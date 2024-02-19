import { z } from 'zod';

import {
  PolicySchema,
  PolicyDetailSchema,
  PolicyResponseSchema,
  PolicyVersionSchema,
  PolicyVersionResponseSchema,
  PolicyFormSchema,
  PolicyTemplateSchema,
  PolicyLangMetaSchema,
  PolicyLanguageResponseSchema,
  PolicyUserResponseSchema,
  PolicyUserSchema,
  PolicyLanguageSchema,
  PolicyLanguageDetailSchema,
  FormFieldSchema,
  PolicyPreviewSchema,
  PolicyTemplateFormSchema,
  PolicyTemplateFormFieldsSchema,
  PolicyFormFieldsFormSchema,
} from '../schemas';

export type Policy = z.infer<typeof PolicySchema>;

export type PolicyLanguageDetail = z.infer<
  typeof PolicyLanguageDetailSchema
>;

export type PolicyFormFieldsForm = z.infer<
  typeof PolicyFormFieldsFormSchema
>;

export type PolicyTemplateFormFields = z.infer<
  typeof PolicyTemplateFormFieldsSchema
>;

export type PolicyTemplateForm = z.infer<
  typeof PolicyTemplateFormSchema
>;

export type PolicyLanguage = z.infer<
  typeof PolicyLanguageSchema
>;

export type PolicyUser = z.infer<typeof PolicyUserSchema>;

export type PolicyUserResponse = z.infer<
  typeof PolicyUserResponseSchema
>;

export type PolicyLanguageResponse = z.infer<
  typeof PolicyLanguageResponseSchema
>;

export type PolicyLangMeta = z.infer<
  typeof PolicyLangMetaSchema
>;

export type PolicyDetail = z.infer<
  typeof PolicyDetailSchema
>;

export type PolicyResponse = z.infer<
  typeof PolicyResponseSchema
>;

export type PolicyVersion = z.infer<
  typeof PolicyVersionSchema
>;

export type PolicyVersionResponse = z.infer<
  typeof PolicyVersionResponseSchema
>;

export type PolicyFormType = z.infer<
  typeof PolicyFormSchema
>;

export type PolicyTemplate = z.infer<
  typeof PolicyTemplateSchema
>;

export type PolicyFormField = z.infer<
  typeof FormFieldSchema
>;

export type PolicyPreviewType = z.infer<
  typeof PolicyPreviewSchema
>;
