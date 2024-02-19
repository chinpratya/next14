import { z } from 'zod';

import {
  ReportPayloadSchema,
  ReportResponseSchema,
  ReportTableSchema,
  ReportOverviewSchema,
  ReportChartSchema,
  ReportChartResponseSchema,
  RefreshStateSchema,
  LastlogReceiveResponseSchema,
  LastlogReceiveSchema,
  OverviewOptionSchema,
} from '../schemas';

export type ReportPayload = z.infer<
  typeof ReportPayloadSchema
>;

export type ReportResponse = z.infer<
  typeof ReportResponseSchema
>;

export type ReportTable = z.infer<
  typeof ReportTableSchema
>;

export type ReportOverview = z.infer<
  typeof ReportOverviewSchema
>;

export type ReportChart = z.infer<
  typeof ReportChartSchema
>;

export type ReportChartResponse = z.infer<
  typeof ReportChartResponseSchema
>;

export type RefreshState = z.infer<
  typeof RefreshStateSchema
>;

export type LastlogReceive = z.infer<
  typeof LastlogReceiveSchema
>;

export type LastlogReceiveResponse = z.infer<
  typeof LastlogReceiveResponseSchema
>;

export type OverviewOption = z.infer<
  typeof OverviewOptionSchema
>;
