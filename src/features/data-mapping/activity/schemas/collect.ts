import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

import { ActivityCollectOfActivityAccessElementsSchema } from './preview';

export const DataUsagePeriodSchema = z.object({
  day: z.number().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  value: z.number().optional(),
  type: z.string().optional(),
  description: z.string(),
});

export const ActivityCollectImportChannelSchema =
  z.record(z.any());

export const ActivityCollectSchema = EntitySchema.extend({
  dataStoreTypeID: z.array(z.string()),
  dataStoreType: z.array(z.string()),
  isDataUsagePeriod: z.boolean(),
  dataUsagePeriod: DataUsagePeriodSchema,
  dataRetentionMethod: z.string(),
  rightsAndMethodAccessPersonalInformation: z.string(),
  methodRemoveWhenExpire: z.string(),
});

export const ActivityCollectMetaElementsSchema = z.object(
  {
    dataElementID: z.string(),
    dataElementName: z.string(),
  }
);

export const ActivityCollectMetaDataCategorySchema =
  z.object({
    dataElements: z.array(
      ActivityCollectMetaElementsSchema
    ),
    dataCategoryID: z.string(),
    dataCategoryName: z.string(),
  });
export const ActivityCollectMetaSchema = z.object({
  basisID: z.string(),
  basisName: z.string(),
  purposeName: z.string(),
  purposeID: z.string(),
  dataCategory: z.array(
    ActivityCollectMetaDataCategorySchema
  ),
});

export const ActivityCollectPurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  legalBasis: z.string(),
  group: z.string(),
  organization: z.string(),
  isDataUsagePeriod: z.boolean(),
  dataUsagePeriod: DataUsagePeriodSchema,
});

export const ActivityCollectPurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityCollectPurposeSchema),
  });

export const ActivityCollectOfActivityAccessDeatilElementsSchema =
  z.object({
    purposeID: z.string(),
    purposeName: z.string(),
    basisID: z.string(),
    basisName: z.string(),
    dataElementID: z.string(),
    dataElementName: z.string(),
    dataCategoryID: z.string(),
    dataCategoryName: z.string(),
  });

export const ActivityCollectOfActivityAccessSchema =
  z.object({
    ObjectUUID: z.string(),
    organizationID: z.array(z.string()),
    organizationName: z.array(z.string()),
    elements: z.array(
      ActivityCollectOfActivityAccessElementsSchema
    ),
    description: z.string(),
  });

export const ActivityCollectOfActivityAccessDetailSchema =
  z.object({
    ObjectUUID: z.string(),
    organizationID: z.array(z.string()),
    elements: z.array(
      ActivityCollectOfActivityAccessDeatilElementsSchema
    ),
    description: z.string(),
  });

export const ActivityCollectOfActivityAccessResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityCollectOfActivityAccessSchema),
  });

export const ActivityCollectChannelSchema = z.object({
  assetID: z.string(),
  name: z.string(),
  group: z.string(),
  owner: z.string(),
  country: z.string(),
  organization: z.string(),
  sourceID: z.array(z.string()),
  source: z.array(z.string()),
});

export const ActivityCollectChannelResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityCollectChannelSchema),
  });

export const ActivityCollectDataRetentionSchema =
  z.object({
    assetID: z.string(),
    name: z.string(),
    group: z.string(),
    owner: z.string(),
    country: z.string(),
    organization: z.string(),
    sourceID: z.string(),
    source: z.string(),
  });

export const ActivityCollectDataRetentionResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityCollectDataRetentionSchema),
  });
