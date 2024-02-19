import { z } from 'zod';

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

export const ReportResponseSchema = z.array(
  z.object({
    event: z.number().optional(),
    hostname: z.string().optional(),
    indices: z.string().optional(),
    label: z.string().optional(),
    value: z.number().optional(),
  })
);

export const ReportTableSchema = z.record(
  z.string(),
  z.array(
    z.object({
      day: z.number(),
      description: z.string(),
      expire_date: z.string(),
      name: z.string(),
      path: z.string(),
      type: z.string(),
    })
  )
);

export const OverviewOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ReportOverviewSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const ReportChartSchema = z.object({
  meta: z.array(z.string()),
  value: z.array(
    z.object({
      label: z.string(),
      value: z.array(z.number()),
    })
  ),
});

export const ReportChartResponseSchema = z.array(
  ReportChartSchema
);

export const RefreshStateSchema = z.object({
  disabled: z.boolean(),
  refreshTime: z.number(),
  refreshLabel: z.string(),
  isRefresh: z.boolean(),
  isRefreshing: z.object({
    overview: z.boolean().optional(),
    event: z.boolean().optional(),
    totalStorage: z.boolean().optional(),
    storageList: z.boolean().optional(),
    topEvent: z.boolean().optional(),
    lastlogReceive: z.boolean().optional(),
    categoryAttack: z.boolean().optional(),
    alertSignatureRule: z.boolean().optional(),
    incident: z.boolean().optional(),
  }),
  loading: z.boolean(),
});

export const LastlogReceiveSchema = z.object({
  id: z.string(),
  indice: z.string(),
  label: z.string(),
  value: z.string(),
  status: z.string(),
  collected: z.string(),
});

export const LastlogReceiveResponseSchema = z.object({
  indices: z.array(OverviewOptionSchema),
  lists: z.array(
    z.record(
      z.string(),
      z.array(
        z.object({
          label: z.string(),
          value: z.string(),
          status: z.string(),
          collected: z.string(),
        })
      )
    )
  ),
});
