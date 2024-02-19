import { z } from 'zod';

export const ActorItemSchema = z.object({
  actorID: z.string(),
  name: z.string(),
  address: z.string(),
  personalType: z.string(),
  actorType: z.string(),
  country: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const DataCategoriesItemSchema = z.object({
  _id: z.number(),
  DataCategory: z.string(),
  dataClassification: z.array(z.string()),
  dataElement: z.array(z.string()),
  dataSubject: z.array(z.string()),
  purposeID: z.string(),
  purposeName: z.string(),
});

export const ConsentItemSchema = z.object({
  isConsent: z.boolean(),
  exception: z.string().optional(),
});

export const DataRetentionPeriodSchema = z.object({
  day: z.number().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  description: z.string().optional(),
});

export const DataUsingPeriodSchema = z.object({
  day: z.number().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  description: z.string().optional(),
});

export const PurposesItemSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  dataRetention: z.string(),
  legalBasis: z.string(),
  consent: ConsentItemSchema,
  DataRetentionPeriod: DataRetentionPeriodSchema,
  DataUsingPeriod: DataUsingPeriodSchema,
  isTransfer: z.boolean().optional(),
  _id: z.number().optional(),
});

export const TransferDataItemSchema = z.object({
  purpose: z.string(),
  position: z.string(),
  country: z.string(),
  isCompanyGroup: z.boolean(),
  destCountry: z.string(),
  destName: z.string(),
  tranferMethod: z.string(),
  personalDataProtectionMeasures: z.string(),
  fileUrl: z.array(z.string()).optional(),
});

export const PurposeItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  purposes: z.array(z.string()),
});

export const SecurityMeasuresItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  management: z.string(),
  technical: z.string(),
  physical: z.string(),
});

export const RightsOfPersonalItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  isGrant: z.boolean(),
});

export const PrivacyPolicyItemSchema = z.object({
  storage: z.array(PurposeItemSchema),
  storageType: z.array(PurposeItemSchema),
  dataRetentionMethod: z.array(PurposeItemSchema),
  rightsAccessPersonalData: z.array(PurposeItemSchema),
  removeOrDelete: z.array(PurposeItemSchema),
  securityMeasuresUnderSection37: z.array(
    SecurityMeasuresItemSchema
  ),
  rightsOfPersonalData: z.array(
    RightsOfPersonalItemSchema
  ),
});

export const ActivityAccessElementsSchema = z.object({
  dataElementID: z.array(z.string()),
  dataElementName: z.array(z.string()),
  dataCategoryID: z.array(z.string()),
  dataCategoryName: z.array(z.string()),
});
export const ActivityCollectOfActivityAccessElementsSchema =
  z.object({
    purposeID: z.string(),
    purposeName: z.string(),
    basisID: z.string(),
    basisName: z.string(),
    subelements: ActivityAccessElementsSchema,
  });
export const ActivityPreviewAccessSchema = z.object({
  organizationID: z.array(z.string()),
  organizationName: z.array(z.string()),
  elements: z.array(
    ActivityCollectOfActivityAccessElementsSchema
  ),
  description: z.string(),
});

export const ActivityPreviewSchema = z.object({
  activityID: z.string(),
  name: z.string(),
  dataController: z.array(ActorItemSchema),
  dataProtectionOfficer: z.array(ActorItemSchema),
  dataCategories: z.array(DataCategoriesItemSchema),
  purposes: z.array(PurposesItemSchema),
  isTranfer: z.boolean(),
  tranferData: z.array(TransferDataItemSchema),
  privacyPolicy: PrivacyPolicyItemSchema,
  access: z.array(ActivityPreviewAccessSchema),
});
