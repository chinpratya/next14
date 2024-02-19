import { z } from 'zod';

import {
  AssetResponseSchema,
  AssetSchema,
  AssetResponsibleSchema,
  AssetResponsibleResponseSchema,
  AssetInfoSchema,
} from '../schemas';

export type Asset = z.infer<typeof AssetSchema>;

export type AssetResponse = z.infer<
  typeof AssetResponseSchema
>;

export type AssetResponsible = z.infer<
  typeof AssetResponsibleSchema
>;

export type AssetResponsibleResponse = z.infer<
  typeof AssetResponsibleResponseSchema
>;

export type AssetInfo = z.infer<typeof AssetInfoSchema>;
