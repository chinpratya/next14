import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const ActivityDisclosureActorSchema = z.object({
  actorID: z.string(),
  name: z.string(),
  personalType: z.string(),
  actorType: z.string(),
  country: z.string(),
  organization: z.string(),
  organizationType: z.string(),
  purposeID: z.string().optional(),
  purpose: z.string().optional(),
});
export const ActivityDisclosureActorResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityDisclosureActorSchema),
  });

export const ActivityDisclosurePurposePeriodSchema =
  z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
    description: z.string(),
  });

export const ActivityDisclosurePurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  lawBasis: z.string(),
  dataCategories: z.array(
    z.object({
      dataCategoryID: z.string(),
      name: z.string(),
      classificationID: z.string(),
      classificationName: z.string(),
    })
  ),
  dataElements: z.array(
    z.object({
      dataElementID: z.string(),
      name: z.string(),
      classificationID: z.string(),
      classificationName: z.string(),
    })
  ),
  chanel: z.string(),
  assetType: z.array(z.string()),
  isDataUsagePeriod: z.boolean(),
  dataUsagePeriod: ActivityDisclosurePurposePeriodSchema,
  isDataRetentionPeriod: z.boolean(),
  dataRetentionPeriod:
    ActivityDisclosurePurposePeriodSchema,
  storage: z.string(),
  dataRetentionMethod: z.string(),
  rightsAndMethodAccessPersonalInformation: z.string(),
  source: z.string(),
  methodRemoveWhenExpire: z.string(),
});

export const ActivityDisclosurePurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityDisclosurePurposeSchema),
  });

export const ActivityDisclosurePurposeDestinationSchema =
  z.object({
    destinationID: z.string(),
    actorID: z.string(),
    name: z.string(),
    email: z.string(),
    tel: z.string(),
    address: z.string(),
    country: z.string(),
    url: z.string(),
    personalType: z.string(),
    actorType: z.string(),
    tranferType: z.array(z.string()),
    legalPDPA: z.string(),
    isDPA: z.boolean(),
    dpaUrl: z.array(z.string()),
    isPDSA: z.boolean(),
    pdsaUrl: z.array(z.string()),
    tranferMethod: z.array(z.string()),
  });

export const ActivityDisclosurePurposeDestinationResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      ActivityDisclosurePurposeDestinationSchema
    ),
  });

export const ActivityDestinationPersonalProtectionMeasuresSchema =
  z.object({
    lawID: z.string(),
    lawname: z.union([z.string(), z.null()]),
  });
export const ActivityDestinationPersonalProtectionMeasuresResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      ActivityDestinationPersonalProtectionMeasuresSchema
    ),
  });
