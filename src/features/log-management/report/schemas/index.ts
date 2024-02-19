import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const ReportSchedulerSchema = z.object({
  _id: z.string(),
  organization: z.string(),
  module: z.string(),
  name: z.string(),
  every: z.string(),
  notify: z.array(z.string()),
  filter: z.object({
    indices: z.array(z.string()).nullable(),
    host: z.array(z.string()).optional(),
    type: z.string(),
    from: z.string(),
    to: z.string(),
    limit: z.number(),
  }),
  status: z.string(),
  created_by: z.string(),
  created_date: z.string(),
  updated_by: z.string(),
  updated_date: z.string(),
});

export const ReportDownloadSchema = z.object({
  _id: z.string(),
  organization: z.string(),
  module: z.string(),
  name: z.string(),
  path: z.string(),
  status_report: z.string(),
  expired_date: z.string(),
  status: z.string(),
  created_by: z.string(),
  created_date: z.string(),
  updated_by: z.string(),
  updated_date: z.string(),
});

export const ReportPayloadSchema = z.object({
  type: z.string(),
  module: z.string(),
  report_type: z.string(),
  filter: z.object({
    indices: z.string().array(),
    hosts: z.string().array(),
    from: z.string(),
    to: z.string(),
    type: z.string(),
    limit: z.number().optional(),
  }),
});

export const ReportFilterSchema = z.object({
  indices: z.array(z.string()),
  hostname: z.array(z.string()),
  timestamp: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

export const OptionSchema = z.object({
  label: z.string(),
  value: z.string().or(z.number()),
});

export const OptionResponseSchema = z.array(OptionSchema);

export const ReportSchedulerResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(ReportSchedulerSchema),
  });

export const ReportDownloadResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(ReportDownloadSchema),
  });

export const ReportHostEventTrafficSchema = z.object({
  event: z.number(),
  hostname: z.string(),
});

export const ReportHostEventTrafficResponseSchema =
  z.array(ReportHostEventTrafficSchema);

export const ArchiveIndiceSchema = z.object({
  name: z.string(),
  path: z.string(),
  type: z.string(),
  day: z.number(),
  expire_date: z.string(),
  description: z.string(),
});

export const ReportArchiveIndiceSchema = z.record(
  z.string(),
  z.array(ArchiveIndiceSchema)
);

export const EventSummaryHostSchema = z.object({
  avg: z.number(),
  hostname: z.string(),
  indices: z.string(),
  max: z.number(),
  min: z.number(),
  sum: z.number(),
});

export const EventSummaryListSchema = z.record(
  z.string(),
  z.array(EventSummaryHostSchema)
);
