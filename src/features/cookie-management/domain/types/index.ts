import { z } from 'zod';

import {
  CookieDomainSchema,
  CookieDomainListSchema,
} from '../schemas';

export type CookieDomain = z.infer<
  typeof CookieDomainSchema
>;

export type CookieDomainList = z.infer<
  typeof CookieDomainListSchema
>;
