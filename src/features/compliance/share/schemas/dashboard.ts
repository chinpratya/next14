import { z } from 'zod';

const GridSchema = z.object({
  left: z.string(),
  right: z.string(),
  bottom: z.string(),
  containLabel: z.boolean().optional(),
});

const LegendSchema = z.object({
  show: z.boolean(),
  padding: z.number(),
  bottom: z.number(),
  data: z.array(z.string()).optional(),
  type: z.string().optional(),
});
const AxisSchema = z.object({
  type: z.string().optional(),
  boundaryGap: z.boolean().optional(),
  data: z.array(z.string()).optional(),
  axisLabel: z.object({ rotate: z.number() }).optional(),
});
const SeriesSchema = z.object({
  name: z.string().optional(),
  type: z.string(),
  stack: z.string().optional(),
  data: z.array(z.number()).optional(),
});

const lineChartSchema = z.object({
  grid: GridSchema,
  legend: LegendSchema.optional(),
  series: z.array(SeriesSchema),
  title: z.object({ text: z.string() }),
  tooltip: z.object({ trigger: z.string() }),
  xAxis: AxisSchema.optional(),
  yAxis: AxisSchema.optional(),
});
export const RankingSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  value: z.number(),
});

export const AssessmentSubmissionSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  ranking: z.union([z.array(RankingSchema), z.null()]),
});
export const AssessmentsSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  assessmentSubmission: z.union([
    z.array(AssessmentSubmissionSchema),
    z.null(),
  ]),
});
export const EchartsSchema = z.object({
  BasicLineChart: lineChartSchema,
  lineStackSections: lineChartSchema,
});
export const DashboardSchema = z.object({
  assessments: z.union([
    z.array(AssessmentsSchema),
    z.null(),
  ]),
  echarts: z.union([EchartsSchema, z.null()]),
});

export const DashboardResponseSchema = z.object({
  code: z.number().optional(),
  data: DashboardSchema,
  message: z.string().optional(),
  statusCode: z.number().optional(),
});

export const OptionsSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  organizationID: z.string().optional(),
});

export const DashboardMetaSchema = z.object({
  organizations: z.union([
    z.array(OptionsSchema),
    z.null(),
  ]),
  branchs: z.union([z.array(OptionsSchema), z.null()]),
  assessments: z.union([
    z.array(OptionsSchema),
    z.null(),
  ]),
  assessmentSubmissions: z.union([
    z.array(OptionsSchema),
    z.null(),
  ]),
});
export const DashboardMetaResponseSchema = z.object({
  code: z.number().optional(),
  data: DashboardMetaSchema,
  message: z.string().optional(),
  statusCode: z.number().optional(),
});
