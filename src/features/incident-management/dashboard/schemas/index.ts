import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const DashboardCount = z.object({
  opendCount: z.number().optional(),
  inprocressCount: z.number().optional(),
  completeCount: z.number().optional(),
  total: z.number().optional(),
});

export const DashboardCountResponseSchema =
  ResponseSchema.extend({
    data: DashboardCount,
  });

export const DashboardByTime = z.object({
  key: z.string(),
  high: z.number(),
  medium: z.number(),
  low: z.number(),
});

export const DashboardByTimeResponseSchema =
  ResponseSchema.extend({
    data: z.array(DashboardByTime),
  });

export const DashboardListOfRequest = z.object({
  key: z.string(),
  physical_security: z.number(),
  cyber_security: z.number(),
  privacy_management: z.number(),
});

export const DashboardListOfRequestStatus = z.object({
  key: z.string(),
  opened: z.number().optional(),
  reject: z.number().optional(),
  closed: z.number().optional(),
});

export const DashboardListOfRequestSchema =
  ResponseSchema.extend({
    data: z.object({
      event_cateogry: z.array(DashboardListOfRequest),
      status: z.array(DashboardListOfRequestStatus),
    }),
  });
