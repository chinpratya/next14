import { z } from 'zod';

import {
  ReportSchedulerResponseSchema,
  ReportSchedulerSchema,
  ReportDownloadResponseSchema,
  ReportDownloadSchema,
  ReportPayloadSchema,
  ReportFilterSchema,
  UnresolvedIncidentSchema,
  OptionSchema,
  OptionResponseSchema,
  ReportHostEventTrafficSchema,
  ReportHostEventTrafficResponseSchema,
  EventSummaryListSchema,
  EventSummaryHostSchema,
  EventSummaryOrganizationSchema,
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

export type UnresolvedIncident = z.infer<
  typeof UnresolvedIncidentSchema
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

export type EventSummaryList = z.infer<
  typeof EventSummaryListSchema
>;

export type EventSummaryHost = z.infer<
  typeof EventSummaryHostSchema
>;

export type EventSummaryOrganization = z.infer<
  typeof EventSummaryOrganizationSchema
>;
