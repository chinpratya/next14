import { z } from 'zod';

export const provinceSchema = z.object({
  ProvinceEng: z.string(),
  ProvinceID: z.string(),
  ProvinceThai: z.string(),
  Region: z.string(),
});

export const provinceResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.array(provinceSchema),
  statusCode: z.number().optional(),
});

export const districtSchema = z.object({
  DistrictEng: z.string(),
  DistrictEngShort: z.string(),
  DistrictID: z.string(),
  DistrictThai: z.string(),
  DistrictThaiShort: z.string(),
  ProvinceID: z.string(),
});

export const districtResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.array(districtSchema),
  statusCode: z.number().optional(),
});
