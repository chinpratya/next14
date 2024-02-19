import { z } from 'zod';

import {
  ReportSchedulerResponseSchema,
  ReportSchedulerSchema,
  ReportDownloadResponseSchema,
  ReportDownloadSchema,
  ReportPayloadSchema,
  ReportFilterSchema,
  OptionSchema,
  OptionResponseSchema,
  ReportHostEventTrafficSchema,
  ReportHostEventTrafficResponseSchema,
  ReportArchiveIndiceSchema,
  ArchiveIndiceSchema,
  EventSummaryListSchema,
} from '../schemas';

export type ReportSchedulerResponse = z.infer<
  typeof ReportSchedulerResponseSchema
>;

export type ReportScheduler = z.infer<
  typeof ReportSchedulerSchema
>;

export type ReportDownloadResponse = z.infer<
  typeof ReportDownloadResponseSchema
>;

export type ReportDownload = z.infer<
  typeof ReportDownloadSchema
>;

export type ReportPayload = z.infer<
  typeof ReportPayloadSchema
>;

export type ReportFilter = z.infer<
  typeof ReportFilterSchema
>;

export type Option = z.infer<typeof OptionSchema>;

export type OptionResponse = z.infer<
  typeof OptionResponseSchema
>;

export type ReportHostEventTraffic = z.infer<
  typeof ReportHostEventTrafficSchema
>;

export type ReportHostEventTrafficResponse = z.infer<
  typeof ReportHostEventTrafficResponseSchema
>;

export type ReportArchiveIndice = z.infer<
  typeof ReportArchiveIndiceSchema
>;

export type ArchiveIndice = z.infer<
  typeof ArchiveIndiceSchema
>;

export type EventSummaryList = z.infer<
  typeof EventSummaryListSchema
>;
