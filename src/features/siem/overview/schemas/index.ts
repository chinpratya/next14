import { z } from 'zod';

import { IncidentSchema } from '../../incident/schemas';

export const ReportChartSchema = z.object({
  category_count: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
  alert_rule_count: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
});

export const ReportWidgetSchema = z.object({
  detection_count: z.number(),
  device_count: z.number(),
  rule_count: z.number(),
  severity_count: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
});

export const OverviewListSchema = z.object({
  incident: z.array(IncidentSchema.extend({})),
});

export const OverviewDeviceSchema = z.object({
  label: z.string(),
  value: z.number(),
});
