import { z } from 'zod';

import {
  CookieConsentSchema,
  CookieConsentResponseSchema,
  CookieConsentMetaSchema,
} from '../schemas';

export type CookieConsent = z.infer<
  typeof CookieConsentSchema
>;

export type CookieConsentResponse = z.infer<
  typeof CookieConsentResponseSchema
>;

export type CookieConsentMeta = z.infer<
  typeof CookieConsentMetaSchema
>;
