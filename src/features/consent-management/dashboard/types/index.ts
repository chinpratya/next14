import { z } from 'zod';

import {
  DashboardCountSchema,
  DashboardConsentSourceSchema,
  DashboardActivitySchema,
  DashboardAcceptSchema,
  DashboardActivityGroupSchema,
  DashboardCookieConsentSchema,
} from '../schemas';

export type DashboardCount = z.infer<
  typeof DashboardCountSchema
>;

export type DashboardConsentSource = z.infer<
  typeof DashboardConsentSourceSchema
>;

export type DashboardActivity = z.infer<
  typeof DashboardActivitySchema
>;

export type DashboardAccept = z.infer<
  typeof DashboardAcceptSchema
>;

export type DashboardActivityGroup = z.infer<
  typeof DashboardActivityGroupSchema
>;

export type DashboardCookieConsent = z.infer<
  typeof DashboardCookieConsentSchema
>;
