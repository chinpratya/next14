import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const CountrySchema = z.object({
  ObjectUUID: z.string(),
  name_th: z.string(),
  name_en: z.string(),
  alpha2: z.string(),
  alpha3: z.string(),
  numeric: z.string(),
  iso3166_2: z.string(),
  region: z.string(),
  sub_region: z.string(),
  intermediate_region: z.string(),
  region_code: z.string(),
  sub_region_code: z.string(),
  intermediate_region_code: z.string(),
});

export const CountryResponseSchema =
  ResponseSchema.extend({
    data: z.array(CountrySchema),
  });

export const CommentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  email: z.string().optional(),
  userid: z.string().optional(),
  comment: z.string(),
  imageprofile: z.union([z.string(), z.null()]),
  usertype: z.string(),
  parentid: z.union([z.string(), z.null()]),
  isadmin: z.boolean().optional(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string(),
  updated_by: z.string(),
});
