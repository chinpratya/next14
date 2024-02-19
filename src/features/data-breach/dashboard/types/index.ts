import { z } from 'zod';

import {
  DashboardDailyRequestsSchema,
  DashboardRequestsSchema,
  DashboardSchema,
  DashboardSummaryDataSchema,
  DashboardTypeOfRequestSchema,
  DashboardTaskSchema,
  DashboardWebFormRequestSchema,
  DashboardCountSchema,
  DashboardByTimeSchema,
  DashboardRequestsBySubjectTypeSchema,
} from '../schemas';

export type DashboardCount = z.infer<
  typeof DashboardCountSchema
>;

export type DashboardRequestsBySubjectType = z.infer<
  typeof DashboardRequestsBySubjectTypeSchema
>;

export type DashboardByTime = z.infer<
  typeof DashboardByTimeSchema
>;
export type DashboardDailyRequest = z.infer<
  typeof DashboardDailyRequestsSchema
>;

export type DashboardRequests = z.infer<
  typeof DashboardRequestsSchema
>;

export type Dashboard = z.infer<typeof DashboardSchema>;

export type DashboardSummaryData = z.infer<
  typeof DashboardSummaryDataSchema
>;

export type DashboardTypeOfRequest = z.infer<
  typeof DashboardTypeOfRequestSchema
>;

export type DashboardTask = z.infer<
  typeof DashboardTaskSchema
>;

export type DashboardWebFormRequest = z.infer<
  typeof DashboardWebFormRequestSchema
>;
