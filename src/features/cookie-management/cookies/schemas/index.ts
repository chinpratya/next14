import { z } from 'zod';

export const CookieItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  domain: z.string(),
  Expiry: z.string(),
  description: z.object({
    en: z.string().optional(),
    th: z.string().optional(),
  }),
});

export const CookieCategorySchema = z.object({
  cetegory_label: z.object({
    en: z.string().optional(),
    th: z.string().optional(),
  }),
  cetegory_name: z.string(),
  background: z.string(),
  necessary: z.boolean(),
  description: z.object({
    en: z.string().optional(),
    th: z.string().optional(),
  }),
});

export const CookieDomainDataSchema = z.object({
  cookies: z.array(CookieItemSchema),
  category: z.array(CookieCategorySchema),
});
