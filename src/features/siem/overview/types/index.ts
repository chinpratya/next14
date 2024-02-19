import { z } from 'zod';

import {
  OverviewDeviceSchema,
  OverviewListSchema,
  ReportChartSchema,
  ReportWidgetSchema,
} from '../schemas';

export type OverviewTableList = z.infer<
  typeof OverviewListSchema
>;

export type ChartReport = z.infer<
  typeof ReportChartSchema
>;

export type WidgetReport = z.infer<
  typeof ReportWidgetSchema
>;

export type OverviewDevice = z.infer<
  typeof OverviewDeviceSchema
>;
