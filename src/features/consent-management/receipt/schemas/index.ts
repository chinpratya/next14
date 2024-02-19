import { z } from 'zod';

import {
  ResponseSchema,
  ConsentFormItemSchema,
  ConsentFormSettingSchema,
  ConsentVisibilitySchema,
  ConsentPurposeSchema,
  EntitySchema,
} from '@/schema';

export const ReceiptSchema = EntitySchema.extend({
  receiptsID: z.string(),
  dataSubjectID: z.string(),
  dataSubject: z.string(),
  email: z.string(),
  status: z.string(),
  collectionPointID: z.string(),
  collectionPoint: z.string(),
  version: z.string(),
  CollectionMethod: z.string(),
  activityGroup: z.string(),
  dataController: z.string(),
  timestamp: z.string(),
  type: z.string(),
  identify: z.string(),
  activity: z.string(),
  verify: z.boolean(),
  policyName: z.string(),
  policyLink: z.string().optional(),
  policyVersion: z.string(),
  isCurrent: z.boolean().optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
  massage: z.string().optional(),
  channel: z.string().optional(),
  tel: z.string().optional(),
});

export const ReceiptResponseSchema =
  ResponseSchema.extend({
    data: z.array(ReceiptSchema),
  });

export const ReceiptMetaOptionsSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const ReceiptMetaSchema = z.object({
  dataSubject: z.array(ReceiptMetaOptionsSchema),
  isAccept: z.array(ReceiptMetaOptionsSchema),
  isCurrent: z.array(ReceiptMetaOptionsSchema),
  isVerify: z.array(ReceiptMetaOptionsSchema),
  purpose: z.array(ReceiptMetaOptionsSchema),
  tag: z.array(ReceiptMetaOptionsSchema),
  dataSubjectType: z.array(ReceiptMetaOptionsSchema),
  consentForm: z.array(ReceiptMetaOptionsSchema),
  collectionMethod: z.array(ReceiptMetaOptionsSchema),
  policy: z.array(ReceiptMetaOptionsSchema),
  activity: z.array(ReceiptMetaOptionsSchema),
  activityGroup: z.array(ReceiptMetaOptionsSchema),
});

export const ReceiptFormSchema = z.object({
  form: z.object({
    formItems: z.array(ConsentFormItemSchema),
    formSetting: ConsentFormSettingSchema,
    formConditions: z
      .array(ConsentVisibilitySchema)
      .optional(),
  }),
  data: z.array(z.any()),
});

export const ReceiptPurposeResponseSchema =
  ResponseSchema.extend({
    data: z.object({
      formTemplate: z.object({
        formItems: z.array(ConsentPurposeSchema),
        formSetting: z.union([
          ConsentFormSettingSchema,
          z.any(),
        ]),
      }),
    }),
  });
