import { z } from 'zod';

// import { ResponseSchema } from '@/schema';

export const GraphSchema = z.record(z.string(), z.any());

export const GraphAssessmentSchema = z.object({
  title: z.string(),
  value: z.array(
    z.object({
      key: z.string(),
      actualPercent: z.number(),
      actualScore: z.number(),
      totalPercent: z.number(),
      totalScore: z.number(),
      value: z.number(),
    })
  ),
});

export const GraphMetaSchema = z.object({
  key: z.string(),
  name: z.string(),
});

export const TableSchema = z.object({
  ObjectUUID: z.string(),
  label: z.string(),
  name: z.string(),
  maxScore: z.number(),
  score: z.number(),
  percent: z.number(),
  maturityModelLV: z.string(),
});
export const AssessmentSubmissionRankingScoreSchema =
  z.record(z.string(), z.any());
export const AssessmentSubmissionRankingMetaSchema =
  z.object({
    key: z.string(),
    value: z.string(),
  });

export const AssessmentSubmissionRankingSchema = z.object(
  {
    scores: z.array(
      AssessmentSubmissionRankingScoreSchema
    ),
    avgHorizontal: AssessmentSubmissionRankingScoreSchema,
  }
);

export const MaturityModelDetailSchema = z.object({
  ObjectUUID: z.string(),
  columnDetail: z.string(),
  columnName: z.string(),
  description: z.string(),
  icon: z.string(),
  max: z.number(),
  min: z.number(),
});

export const MaturityModelReportSchema = z.object({
  ObjectID: z.string().optional(),
  ObjectType: z.string().optional(),
  ObjectUUID: z.string().optional(),
  TenantID: z.string().optional(),
  createdBy: z.string().optional(),
  createdDt: z.union([z.string(), z.null()]).optional(),
  description: z.string().optional(),
  detail: z.array(MaturityModelDetailSchema).optional(),
  isDelete: z.boolean().optional(),
  modelType: z.string().optional(),
  name: z.string().optional(),
  updatedBy: z.string().optional(),
  updatedDt: z.union([z.string(), z.null()]).optional(),
});

export const ReportSchema = z.object({
  graph: z.array(GraphAssessmentSchema),
  graphMeta: z.array(GraphMetaSchema),
  sections: z.array(TableSchema),
  avgOfOrg: z.object({
    scores: z.array(
      AssessmentSubmissionRankingScoreSchema
    ),
    avgHorizontal: AssessmentSubmissionRankingScoreSchema,
    meta: z.array(AssessmentSubmissionRankingMetaSchema),
  }),
  maturityModel: z
    .union([MaturityModelReportSchema, z.undefined()])
    .optional(),
  maturityModelID: z.string(),
});

export const listAssessors = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  email: z.string(),
  approver: z.string().optional(),
  status: z.string(),
  deadlineDt: z.string(),
  isExtend: z.boolean(),
  extendDt: z.union([z.string(), z.null()]).optional(),
});
export const ListPortalAssessmentResponseSchema =
  z.object({
    code: z.number(),
    message: z.string().optional(),
    data: z.array(listAssessors),
  });
export const reasons = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  action: z.string(),
  createdDt: z.string(),
});
export const AssessorsDetail = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  email: z.string(),
  approver: z.string().optional(),
  status: z.string(),
  deadlineDt: z.string(),
  isExtend: z.boolean(),
  extendDt: z.union([z.string(), z.null()]).optional(),
  startDt: z.union([z.string(), z.null()]).optional(),
  endDt: z.union([z.string(), z.null()]).optional(),
  sendDt: z.union([z.string(), z.null()]).optional(),
  submitDt: z.union([z.string(), z.null()]).optional(),
  reasons: z.array(reasons).optional(),
  approverName: z.string(),
  approverEmail: z.string(),
  createdDt: z.union([z.string(), z.null()]).optional(),
  createdBy: z.string(),
  updatedDt: z.union([z.string(), z.null()]).optional(),
  updatedBy: z.string(),
});

export const PortalAssessmentDetailResponsSchema =
  z.object({
    code: z.number(),
    message: z.string().optional(),
    data: AssessorsDetail,
  });
export const ReportResponseSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  data: ReportSchema,
});
