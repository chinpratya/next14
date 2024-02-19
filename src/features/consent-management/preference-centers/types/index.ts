import { z } from 'zod';

import {
  PreferenceCentersSchema,
  PreferenceCentersResponseSchema,
  PreferenceCentersDetailSchema,
  ConsentPreferenceActivitySchema,
} from '../schemas';

export type PreferenceCenters = z.infer<
  typeof PreferenceCentersSchema
>;

export type PreferenceCentersResponse = z.infer<
  typeof PreferenceCentersResponseSchema
>;

export type PreferenceCentersDetail = z.infer<
  typeof PreferenceCentersDetailSchema
>;

export type ConsentPreferenceActivity = z.infer<
  typeof ConsentPreferenceActivitySchema
>;
