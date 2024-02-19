import { z } from 'zod';

import {
  CookieCategorySchema,
  CookieItemSchema,
  CookieDomainDataSchema,
} from '../schemas';

export type CookieItem = z.infer<typeof CookieItemSchema>;

export type CookieCategory = z.infer<
  typeof CookieCategorySchema
>;

export type CookieDomainData = z.infer<
  typeof CookieDomainDataSchema
>;
