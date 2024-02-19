import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const CookieConsentSchema = z.object({
  CollectionMethod: z.string(),
  IdentifyType: z.string(),
  ObjectUUID: z.string(),
  PurposeName: z.string(),
  channel: z.string(),
  consent: z.string(),
  consentForm: z.string(),
  consentID: z.string(),
  dataSubject: z.string(),
  isCurrent: z.boolean(),
  position: z.string(),
  timestamp: z.string(),
});

export const CookieConsentResponseSchema =
  ResponseSchema.extend({
    data: z.array(CookieConsentSchema),
  });

export const CookieConsentMetaOptionsSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const CookieConsentMetaSchema = z.object({
  Consent: z.array(CookieConsentMetaOptionsSchema),
  consentForm: z.array(CookieConsentMetaOptionsSchema),
  PurposeName: z.array(CookieConsentMetaOptionsSchema),
});
