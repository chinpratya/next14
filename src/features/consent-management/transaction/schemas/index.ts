import { z } from 'zod';

import {
  ResponseSchema,
  ConsentPurposeSchema,
} from '@/schema';

export const DurationSchema = z.object({
  day: z.string(),
  month: z.string(),
  year: z.string(),
  description: z.string(),
});

export const TransactionSchema = z.object({
  purposeID: z.string(),
  consentReceiptsID: z.string(),
  dataSubject: z.string(),
  email: z.string(),
  status: z.string(),
  collectionPoint: z.string(),
  activityGroup: z.string(),
  purposeGroup: z.string(),
  duration: DurationSchema,
  expiryDate: z.string(),
  type: z.string(),
  identify: z.string(),
  activity: z.string(),
  verify: z.boolean(),
  version: z.string(),
  CollectionMethod: z.string(),
  policyName: z.string(),
  policyVersion: z.string(),
  publicDt: z.string(),
  tagName: z.array(z.string()),
  purposeName: z.string(),
  isCurrent: z.boolean().optional(),
  massage: z.string().optional(),
  channel: z.string().optional(),
  tel: z.string().optional(),
});

export const TransactionResponseSchema =
  ResponseSchema.extend({
    data: z.array(TransactionSchema),
  });

export const TransactionDetailSchema = z.object({
  receiptID: z.string(),
  transactionsID: z.string(),
  source: z.string(),
  activityGroup: z.string(),
  status: z.string(),
  subjectIdentifierID: z.string(),
  dataSubject: z.string(),
  interactionType: z.string(),
  cratedDt: z.string(),
  version: z.string(),
  chanel: z.string(),
  activityName: z.string(),
  consentType: z.string(),
  optIn: z.boolean(),
  identify: z.string(),
  policyName: z.string(),
});

export const PreferencesItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  attributeTypeID: z.string(),
  attributeType: z.string(),
  choices: z.array(z.string()),
  value: z.string().optional(),
});

export const TransactionPurposeSchema = z.object({
  form: z.array(ConsentPurposeSchema),
});

export const MetaSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const TransactionMetaSchema = z.object({
  isCurrent: z.array(MetaSchema),
  isAccept: z.array(MetaSchema),
  isVerify: z.array(MetaSchema),
  dataSubject: z.array(MetaSchema),
  purpose: z.array(MetaSchema),
  tag: z.array(MetaSchema),
});
