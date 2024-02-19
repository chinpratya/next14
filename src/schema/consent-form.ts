import { z } from 'zod';

export const ConsentPreferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.any(),
  attributeTypeID: z.string(),
  choices: z.array(z.string()),
});

export const ConsentPolicySchema = z.object({
  policyName: z.string(),
  policyLink: z.string(),
});

export const ConsentPurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  description: z.string(),
  displayType: z.string(),
  isAccepted: z.boolean().optional(),
  preferences: z.array(ConsentPreferenceSchema),
});

export const ConsentActivitySchema = z.object({
  activityID: z.string(),
  activity: z.string(),
  purposes: z.array(ConsentPurposeSchema),
});

export const ConsentRuleSchema = z.object({
  id: z.string(),
  operator: z.enum([
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'nin',
    'exists',
    'nexists',
    'regex',
    'nregex',
  ]),
  value: z.string(),
});

export const ConsentVisibilitySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z
    .enum(['visibility', 'workflow'])
    .default('visibility')
    .optional(),
  condition: z.enum(['AND', 'OR']),
  rules: z.array(ConsentRuleSchema),
  isVisibility: z.enum(['SHOW', 'HIDE', 'TO']),
  target: z.string(),
});

export const ConsentPropertiesSchema = z.object({
  isHidden: z.boolean().optional(),
  isSystemGenerated: z.boolean().optional(),
  isDisabledDelete: z.boolean().optional(),
  isDisabledEdit: z.boolean().optional(),
});

export const ConsentFormItemSectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  components: z.array(z.record(z.unknown())),
  properties: ConsentPropertiesSchema.optional(),
});

export const ConsentFormItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  sections: z.array(ConsentFormItemSectionSchema),
  properties: ConsentPropertiesSchema.optional(),
});

export const ConsentFormSettingSchema = z.object({
  page: z.record(z.unknown()),
  form: z.record(z.unknown()),
});

export const ConsentFormSchema = z.object({
  formConditions: z.array(ConsentVisibilitySchema),
  formItems: z.array(ConsentFormItemSchema),
  formSetting: ConsentFormSettingSchema,
});
