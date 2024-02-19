import { z } from 'zod';

import {
  ActivityConsentSchema,
  ActivityConsentResponseSchema,
} from '../schemas/consent';

export type ActivityConsent = z.infer<
  typeof ActivityConsentSchema
>;

export type ActivityConsentResponse = z.infer<
  typeof ActivityConsentResponseSchema
>;
