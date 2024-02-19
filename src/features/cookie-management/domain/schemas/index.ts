import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const CookieDomainSchema = z.object({
  domainID: z.string(),
  name: z.string(),
  site: z.string(),
  totalPageScan: z.number(),
  cookies: z.number(),
  scanDate: z.string(),
  status: z.string(),
  limit_scan: z.number(),
});

export const CookieDomainListSchema =
  ResponseSchema.extend({
    data: z.array(CookieDomainSchema),
  });
