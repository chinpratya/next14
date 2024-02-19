import { z } from 'zod';

import {
  CookieDashboardAcceptSchema,
  CookieDashboardCategorySchema,
  CookieDashboardSummarySchema,
  CookieReportCategorySchema,
  CookieReportTypePersonSchema,
  CookieReportExpiredSchema,
  CookieReportClassifiedSchema,
  CookieReportSummarySchema,
  CookieReportTechnologySchema,
} from '../schemas';

export type CookieDashboardSummary = z.infer<
  typeof CookieDashboardSummarySchema
>;

export type CookieDashboardCategory = z.infer<
  typeof CookieDashboardCategorySchema
>;

export type CookieDashboardAccept = z.infer<
  typeof CookieDashboardAcceptSchema
>;

export type CookieReportCategory = z.infer<
  typeof CookieReportCategorySchema
>;

export type CookieReportTypePerson = z.infer<
  typeof CookieReportTypePersonSchema
>;

export type CookieReportExpired = z.infer<
  typeof CookieReportExpiredSchema
>;

export type CookieReportClassified = z.infer<
  typeof CookieReportClassifiedSchema
>;

export type CookieReportSummary = z.infer<
  typeof CookieReportSummarySchema
>;

export type CookieReportTechnology = z.infer<
  typeof CookieReportTechnologySchema
>;
