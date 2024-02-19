import { z } from 'zod';

// import { EntitySchema, ResponseSchema } from '@/schema';

export const DashboardCountSchema = z.object({
  SubjectIdentifierCount: z.number(),
  ConsnetCount: z.number(),
  TransactionCount: z.number(),
});

export const DashboardConsentSourceSchema = z.array(
  z.object({
    name: z.string(),
    SourceCount: z.number(),
  })
);

export const DashboardActivitySchema = z.array(
  z.object({
    ObjectUUID: z.string(),
    name: z.string(),
    activityCount: z.number(),
  })
);

export const DashboardAcceptSchema = z.array(
  z.object({
    activityID: z.string(),
    name: z.string(),
    acceptCount: z.number(),
    rejectCount: z.number(),
    mixCount: z.number(),
  })
);

export const DashboardActivityGroupSchema = z.array(
  z.object({
    dataLabel: z.string(),
    data: z.array(
      z.object({
        type: z.enum(['accept', 'reject', 'mix']),
        count: z.number(),
      })
    ),
  })
);

export const DashboardCookieConsentSchema = z.object({
  dataLabel: z.array(z.string()),
  data: z.array(
    z.object({
      name: z.string(),
      value: z.array(z.number()),
    })
  ),
});
