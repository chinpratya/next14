import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const AssetSchema = z.object({
  assetID: z.string(),
  name: z.string(),
  group: z.string(),
  country: z.string(),
  owner: z.string(),
  organization: z.string(),
  organizationName: z.string().optional(),
  organizationType: z.string(),
  created_by: z.string(),
  created_dt: z.string(),
  updated_by: z.string(),
  updated_dt: z.string(),
});

export const AssetResponseSchema = ResponseSchema.extend({
  data: z.array(AssetSchema),
});

export const AssetResponsibleSchema = z.object({
  responsibleID: z.string(),
  name: z.string(),
  email: z.string(),
  organizationID: z.string(),
  organizationName: z.string(),
  assetID: z.string(),
  created_by: z.string(),
  created_dt: z.string(),
  updated_by: z.string(),
  updated_dt: z.string(),
});

export const AssetResponsibleResponseSchema =
  ResponseSchema.extend({
    data: z.array(AssetResponsibleSchema),
  });

export const AssetInfoSchema = z.object({
  assetID: z.string(),
  name: z.string(),
  groupID: z.string(),
  countryID: z.string(),
  pdpaScore: z.string().optional(),
  organizationType: z.string(),
  organizationID: z.string(),
  organizationName: z.string(),
  description: z.string(),
  created_by: z.string(),
  created_dt: z.string(),
  updated_by: z.string(),
  updated_dt: z.string(),
});
