import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const SlaSchema = z.object({
  objectUuid: z.string(),
  name: z.string(),
  detail: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
});

export const SlaListResponseSchema =
  ResponseSchema.extend({
    data: z.array(SlaSchema),
  });
// export const WorkPeriod = z.object({
//   days: z.number(),
//   hours: z.number(),
//   minutes: z.number(),
// });
// export const SeverityListSchema = z.object({
//   displayName: z.string(),
//   value: z.string(),
//   order: z.number(),
//   severityId: z.string(),
//   workPeriod: WorkPeriod,
//   workDescription: z.string(),
//   responsePeriod: WorkPeriod,
//   responseDescription: z.string(),
// });

export const SlaDataSchema = z.object({
  objectUuid: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  name: z.string(),
  detail: z.string(),
  description: z.string(),
  // severityList: z.array(SeverityListSchema),
});

export const SlaDetaSchema = ResponseSchema.extend({
  data: z.array(SlaDataSchema),
});

// SeverityList

export const SlaDataWithSeveritySchema = z.object({
  objectUuid: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  name: z.string(),
  detail: z.string(),
  description: z.string(),
  period: z.object({
    severityId: z.string(),
    workPeriod: z.object({
      days: z.number(),
      hours: z.number(),
      minutes: z.number(),
    }),
    workDescription: z.string(),
    responsePeriod: z.object({
      days: z.number(),
      hours: z.number(),
      minutes: z.number(),
    }),
    responseDescription: z.string(),
  }),

  // severityList: z.array(SeverityListSchema),
});
