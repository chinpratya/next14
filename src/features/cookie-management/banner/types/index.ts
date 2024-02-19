import { z } from 'zod';

import {
  bannerSettingSchema,
  bannerSettingContentSchema,
} from '../schemas';

export type BannerSettingType = z.infer<
  typeof bannerSettingSchema
>;

export type BannerSettingContent = z.infer<
  typeof bannerSettingContentSchema
>;
