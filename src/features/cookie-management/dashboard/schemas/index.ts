import { z } from 'zod';

export const CookieDashboardAcceptSchema = z.object({
  acceptAll: z.number(),
  customization: z.number(),
});

export const CookieDashboardCategorySchema = z.object({
  categoryName: z.string(),
  count: z.number(),
});

export const CookieDashboardSummarySchema = z.object({
  accept: CookieDashboardAcceptSchema,
  category: z.array(CookieDashboardCategorySchema),
});

export const CookieReportCategorySchema = z.object({
  categoryName: z.string(),
  count: z.number(),
});

export const CookieReportTypePersonSchema = z.object({
  FirstPerson: z.number(),
  ThirdPerson: z.number(),
});

export const CookieReportExpiredSchema = z.object({
  moreyear: z.number(),
  lessyear: z.number(),
});

export const CookieReportClassifiedSchema = z.object({
  classified: z.number(),
  unclassified: z.number(),
});

export const CookieReportTechnologySchema = z.object({
  name: z.string(),
  count: z.number(),
});

export const CookieReportSummarySchema = z.object({
  categories: z.array(CookieReportCategorySchema),
  typePerson: CookieReportTypePersonSchema,
  Expiration: CookieReportExpiredSchema,
  Classified: CookieReportClassifiedSchema,
  technology: z.array(CookieReportTechnologySchema),
});
