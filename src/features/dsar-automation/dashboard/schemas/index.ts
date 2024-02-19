import { z } from 'zod';

import { EntitySchema } from '@/schema';

export const DashboardDailyRequestsSchema = z.array(
  z.object({
    name: z.string(),
    value: z.number(),
  })
);

export const DashboardRequestsSchema =
  EntitySchema.extend({
    requestID: z.string(),
    name: z.string(),
    status: z.string(),
    remaining_day: z.string(),
    approver: z.string(),
  });

export const DashboardSummaryDataSchema = z.object({
  requestReceived: z.number(),
  requestsInProgress: z.number(),
  requestSuccess: z.number(),
});

export const DashboardTypeOfRequestSchema = z.object({
  key: z.string(),
  value: z.number(),
});

export const DashboardTaskSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const DashboardWebFormRequestSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const DashboardSchema = z.object({
  summaryData: DashboardSummaryDataSchema,
  dailyRequest: DashboardDailyRequestsSchema,
  typeOfRequest: z.array(DashboardTypeOfRequestSchema),
  task: z.array(DashboardTaskSchema),
  webformRequest: z.array(DashboardWebFormRequestSchema),
  listRequest: z.array(DashboardRequestsSchema),
});

export const DashboardCountSchema = z.object({
  requestCount: z.number(),
  inprocressCount: z.number(),
  completeCount: z.number(),
});

export const DashboardByTimeSchema = z.object({
  key: z.string(),
  value: z.number(),
});

export const DashboardRequestsBySubjectTypeSchema =
  z.object({
    name: z.string(),
    value: z.number(),
  });
