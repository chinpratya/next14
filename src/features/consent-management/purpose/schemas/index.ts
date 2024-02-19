import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const GroupsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ConsentPurposeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  groups: z.array(GroupsSchema),
  status: z.string(),
  version: z.string(),
  created_dt: z.string(),
  updated_dt: z.string(),
});

export const ConsentPurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ConsentPurposeSchema),
  });

export const PreferencesSchema = z.object({
  id: z.string(),
  name: z.string(),
  attributeTypeID: z.string(),
  choices: z.array(z.string()),
});

export const DataUsagePeriod = z.object({
  value: z.number().optional(),
  type: z.string().optional(),
  description: z.string(),
});

export const ConsentPurposeDetailSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  description: z.string(),
  organizationID: z.string(),
  groupID: z.string(),
  status: z.string(),
  isDataUsagePeriod: z.boolean().optional(),
  dataUsagePeriod: DataUsagePeriod.optional(),
  isConsent: z.boolean().optional(),
  consentDetail: z.string().optional(),
  isEffect: z.boolean().optional(),
  effectDescription: z.string().optional(),
  displayType: z.string(),
  preferences: z.array(PreferencesSchema),
});

export const ConsentPurposeVersionSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  created_dt: z.string(),
  updated_dt: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
});

export const PreferenceTypeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const DisplayTypeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  imageLink: z.string(),
});

export const ConsentPurposeMetaSchema = z.object({
  perferenceType: z.array(PreferenceTypeSchema),
  displayType: z.array(DisplayTypeSchema),
});
