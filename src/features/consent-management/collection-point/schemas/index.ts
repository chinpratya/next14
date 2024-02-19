import { z } from 'zod';

import { PolicySchema } from '@/features/policy-management';
import {
  ConsentFormSchema,
  EntitySchema,
  ResponseSchema,
} from '@/schema';

export const ConsentCollectionPointSchema =
  EntitySchema.extend({
    CollectionPointID: z.string(),
    name: z.string(),
    identifier: z.string(),
    version: z.number(),
    status: z.string(),
    isUsing: z.boolean(),
    activity: z.string(),
    activityGroup: z.string(),
    doubleOptIn: z.boolean(),
    isPreference: z.boolean(),
    tagID: z.array(z.string()).optional(),
    tagName: z.array(z.string()).optional(),
  });

export const ConsentCollectionPointResponseSchema =
  ResponseSchema.extend({
    data: z.array(ConsentCollectionPointSchema),
  });

export const ConsentCollectionPointDetailSchema =
  EntitySchema.extend({
    CollectionPointID: z.string(),
    name: z.string(),
    description: z.string(),
    activityID: z.string(),
    activity: z.string(),
    organizationID: z.string(),
    organization: z.string(),
    delegateID: z.string(),
    delegate: z.string(),
    template: z.string(),
    status: z.string(),
    version: z.number(),
    policyType: z.string().optional(),
    policyLink: z.string().optional(),
    policyName: z.string().optional(),
    policyVersion: z.string().optional(),
    policyShow: z.boolean().optional(),
    policyId: z.string().optional(),
    identifier: z.string(),
    reconsentDate: z.number().optional(),
    isReconsent: z.boolean(),
    tagID: z.array(z.string()).optional(),
    tagName: z.array(z.string()).optional(),
  });

export const MetaTypeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const ConsentCollectionPointMetaSchema = z.object({
  policyType: z.array(MetaTypeSchema),
  displayType: z.array(MetaTypeSchema),
  relatePrivacyNotice: z.array(MetaTypeSchema),
  template: z.array(MetaTypeSchema),
  language: z.array(MetaTypeSchema),
});

export const PurposesCollectionSchema = z.object({
  purposeID: z.string(),
  purpose: z.string(),
});

export const DataElementsCollectionSchema = z.object({
  dataElementID: z.string(),
  dataElement: z.string(),
});

export const ConsentCollectionPointElementSchema =
  z.object({
    dataSubjectIdentifier: z.string(),
    purposes: z.array(PurposesCollectionSchema),
    dataElements: z.array(DataElementsCollectionSchema),
  });

export const ConsentCollectionPointPrivacyNoticeSchema =
  z.object({
    isSentLink: z.boolean(),
    doubleOptIn: z.boolean(),
    isprivacyNotice: z.boolean(),
    policyTypeID: z.string(),
    policyType: z.string(),
    privacyName: z.string(),
    relatePrivacyNoticeID: z.string(),
    relatePrivacyNotice: z.string(),
    displayID: z.string(),
    display: z.string(),
    linkPrivacy: z.string(),
    privacyVersion: z.string(),
    UrlPolicy: z.string(),
    isReconsent: z.boolean(),
    reconsentDate: z.number().optional(),
    isBroadcast: z.boolean(),
    broadcastURL: z.string(),
  });

export const CollectionBuilderFormLanguageSchema =
  z.object({
    language: z.string().optional(),
    template: z
      .object({
        formItems: z.array(z.any()),
        formSetting: z.object({
          page: z.record(z.string(), z.string()),
          form: z.record(z.string(), z.string()),
        }),
        formConditions: z.array(z.any()).optional(),
      })
      .optional(),
    languageName: z.string().optional(),
  });
export const ConsentCollectionPointHistorySchema =
  z.object({
    objectUUID: z.string(),
    Template: z
      .array(CollectionBuilderFormLanguageSchema)
      .optional(),
    version: z.string(),
    createdDt: z.string(),
    createdBy: z.string(),
    updatedBy: z.string(),
    updatedDt: z.string(),
  });

export const ConsentCollectionPointHistoryResponseSchema =
  ResponseSchema.extend({
    data: z.array(ConsentCollectionPointHistorySchema),
  });

export const ConsentCollectionPointPolicyMetaSchema =
  PolicySchema;

export const ConsentCollectionPointLanguageSchema =
  z.object({
    languageID: z.string(),
    languageName: z.string(),
  });

export const ConsentCollectionPointLanguageDetailSchema =
  ConsentCollectionPointLanguageSchema.extend({
    form: ConsentFormSchema,
  });
