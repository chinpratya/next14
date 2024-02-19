import { z } from 'zod';

import {
  provinceSchema,
  provinceResponseSchema,
  districtResponseSchema,
  districtSchema,
} from '../schemas/address-schemas';

export type provinceType = z.infer<typeof provinceSchema>;

export type provinceResponseType = z.infer<
  typeof provinceResponseSchema
>;

export type districtResponseType = z.infer<
  typeof districtResponseSchema
>;

export type districtType = z.infer<typeof districtSchema>;
