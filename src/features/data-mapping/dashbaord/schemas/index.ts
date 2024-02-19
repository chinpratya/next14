import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const TotalCountSchema = z.object({
  activityCount: z.number(),
  dataElementCount: z.number(),
  purposeCount: z.number(),
  assetCount: z.number(),
});

export const DashboardGraphSchema = z.object({
  activityCount: z.number(),
  ObjectUUID: z.string(),
  name: z.string(),
});

export const DashboardLawfulBasisSchema = z.object({
  amount: z.number(),
  ObjectUUID: z.string(),
  name: z.string(),
});

export const DashboardLawfulBasisResponseSchema =
  ResponseSchema.extend({
    data: z.array(DashboardLawfulBasisSchema),
  });

export const DashboardThirdPartySchema = z.object({
  role: z.string(),
  country: z.string(),
  ObjectUUID: z.string(),
  name: z.string(),
});

export const DashboardThirdPartyResponseSchema =
  ResponseSchema.extend({
    data: z.array(DashboardThirdPartySchema),
  });

export const DashboardMapThirdPartySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  role: z.string(),
  name_th: z.string(),
  name_en: z.string(),
  alpha2: z.string(),
  alpha3: z.string(),
  numeric: z.string(),
  iso3166_2: z.string(),
  region: z.string(),
  sub_region: z.string(),
});

export const DashboardMapThirdPartyResponseSchema =
  ResponseSchema.extend({
    data: z.array(DashboardMapThirdPartySchema),
  });
