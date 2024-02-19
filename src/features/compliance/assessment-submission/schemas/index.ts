import { z } from 'zod';

import { ResponseSchema } from '@/schema';

import { MaturityModelSchema } from '../../maturity-model/schemas';

export const FilesSchema = z.object({
  fileID: z.string(),
  fileName: z.string(),
});
export const AssessmentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.array(z.string()),
  version: z.number(),
  status: z.string(),
  description: z.string().optional(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
  files: z.array(FilesSchema).optional(),
});

export const AssessmentResponseSchema =
  ResponseSchema.extend({
    data: z.array(AssessmentSchema),
  });

export const AssessmentSubmissionNumberSchema = z.object({
  count: z.number(),
  total: z.number(),
});

export const AssessmentSubmissionSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  assessmentName: z.string(),
  assessmentID: z.string(),
  group: z.string(),
  dueDate: z.string(),
  status: z.string(),
  org: AssessmentSubmissionNumberSchema,
  respondent: AssessmentSubmissionNumberSchema,
  sendDt: z.string(),
  sendBy: z.string(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const AssessmentSubmissionInfoSchema = z.object({
  ObjectUUID: z.string(),
  assessmentID: z.string(),
  assessmentName: z.string(),
  startDt: z.string(),
  endDt: z.string(),
  group: z.string(),
  name: z.string(),
  respondentCount: z.number(),
  status: z.string(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const AssessmentSubmissionResponseSchema =
  ResponseSchema.extend({
    data: z.array(AssessmentSubmissionSchema),
  });

export const AssessmentSubmissionRespondentBranchRespondentSchema =
  z.object({
    ObjectUUID: z.string(),
    name: z.string(),
    department: z.string(),
    position: z.string(),
    tel: z.string(),
    email: z.string(),
    status: z.string().optional(),
    haveApprover: z.boolean(),
    approverID: z.string(),
    approverName: z.string(),
    approverEmail: z.string().optional(),
    active: z.boolean().optional(),
  });

export const AssessmentSubmissionRespondentBranchApproverSchema =
  z.object({
    ObjectUUID: z.string(),
    name: z.string(),
    department: z.string(),
    position: z.string(),
    email: z.string(),
    tel: z.string(),
  });

export const AssessmentSubmissionRespondentBranchSchema =
  z.object({
    ObjectUUID: z.string(),
    name: z.string(),
    respondents: z.array(
      AssessmentSubmissionRespondentBranchRespondentSchema
    ),
    approvers: z.array(
      AssessmentSubmissionRespondentBranchApproverSchema
    ),
  });

export const AssessmentSubmissionAllRespondentSchema =
  z.object({
    ObjectUUID: z.string(),
    name: z.string(),
    orgGroup: z.array(z.string()).optional(),
    industryGroup: z.string(),
    businessCategory: z.string(),
    branchs: z.array(
      AssessmentSubmissionRespondentBranchSchema
    ),
  });

export const AssessmentSubmissionAllRespondentResponseSchema =
  z.array(AssessmentSubmissionAllRespondentSchema);

export const AssessmentSubmissionRespondentAllResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      AssessmentSubmissionAllRespondentSchema
    ),
  });

export const AssessmentSubmissionRespondentsSchema =
  z.object({
    ObjectUUID: z.string(),
    organizationID: z.string(),
    orgName: z.string(),
    respondentID: z.string(),
    name: z.string(),
    email: z.string(),
    approverID: z.string().nullable(),
    approverName: z.string().nullable(),
    assessmentID: z.string().nullable(),
    status: z.string().nullable(),
    dueDate: z.string().nullable(),
    isExtendTime: z.boolean(),
  });

export const AssessmentSubmissionRespondentsResponseSchema =
  ResponseSchema.extend({
    data: z.array(AssessmentSubmissionRespondentsSchema),
  });

export const AssessmentSubmissionRespondentDetailReasonSchema =
  z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    message: z.string().optional(),
    action: z.string().optional(),
    createdDt: z.string().optional(),
  });

export const AssessmentSubmissionRespondentDetailSchema =
  z.object({
    ObjectUUID: z.string(),
    respondentID: z.string(),
    name: z.string(),
    email: z.string(),
    status: z.string(),
    dueDate: z.string(),
    isExtendTime: z.boolean(),
    startDt: z.string(),
    endDt: z.string(),
    sendDt: z.string().optional(),
    submitDt: z.string().optional().nullable(),
    approverName: z.string(),
    approverEmail: z.string(),
    reasons: z
      .array(
        AssessmentSubmissionRespondentDetailReasonSchema
      )
      .optional(),
  });

export const AssessmentSubmissionRespondentDetailFormSchema =
  z.object({
    ObjectUUID: z.string(),
    name: z.string(),
    assessmentName: z.string(),
    webform: z.array(z.any().optional()),
    status: z.string(),
  });

export const AssessmentSubmissionRespondentDetailCommentSchema =
  z.array(
    z.object({
      ObjectUUID: z.string(),
      message: z.string(),
      status: z.string(),
      createdDt: z.union([z.string(), z.null()]),
      createdBy: z.string(),
      updatedDt: z.union([z.string(), z.null()]),
      updatedBy: z.string().optional(),
    })
  );
export const AssessmentSubmissionRespondentDetailResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      AssessmentSubmissionRespondentDetailSchema
    ),
  });

export const AssessmentSubmissionRespondentDetailLogSchema =
  z.object({
    message: z.string(),
    createdDt: z.string(),
    createdBy: z.string(),
  });

export const AssessmentSubmissionRespondentDetailLogResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      AssessmentSubmissionRespondentDetailLogSchema
    ),
  });

export const AssessmentSubmissionRespondentExtendTimeSchema =
  z.object({
    isExtendTime: z.boolean(),
    extendDt: z.string(),
    reason: z.string().optional(),
  });

export const AssessmentSubmissionRespondentExtendTimeResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      AssessmentSubmissionRespondentExtendTimeSchema
    ),
  });

export const AssessmentSubmissionSettingNotificationSchema =
  z.object({
    notiType: z.string().optional(),
    notiDt: z.string().optional(),
  });

export const AssessmentSubmissionSettingDateSchema =
  z.object({
    isSetDt: z.boolean(),
    startDt: z.string(),
    endDt: z.string(),
    isSchedule: z.boolean(),
    scheduleDt: z.string(),
    isNotification: z.boolean(),
    dateDt: z.array(z.any()).optional(),
    notifications: z
      .array(
        AssessmentSubmissionSettingNotificationSchema
      )
      .optional(),
  });

export const AssessmentSubmissionSettingSchema = z.object(
  {
    ObjectUUID: z.string(),
    createdBy: z.string(),
    createdDt: z.string(),
    updatedDt: z.string(),
    data: AssessmentSubmissionSettingDateSchema,
    dateDt: z.any().optional(),
  }
);

export const AssessmentSubmissionSettingResponseSchema =
  ResponseSchema.extend({
    data: z
      .array(AssessmentSubmissionSettingSchema)
      .optional(),
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

export const AssessmentSubmissionRankingResponseSchema =
  z.object({
    code: z.number(),
    message: z.string(),
    data: AssessmentSubmissionRankingSchema,
    meta: z.array(AssessmentSubmissionRankingMetaSchema),
  });

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

export const GraphMetaAssessmentSchema = z.object({
  key: z.string(),
  name: z.string(),
});

export const TableAssessmentSchema = z.object({
  ObjectUUID: z.string(),
  label: z.string(),
  name: z.string(),
  maxScore: z.number(),
  score: z.number(),
  percent: z.number(),
  maturityModelLV: z.string(),
});

export const AssessmentReportSchema = z.object({
  graph: z.array(GraphAssessmentSchema),
  graphMeta: z.array(GraphMetaAssessmentSchema),
  sections: z.array(TableAssessmentSchema),
  avgOfOrg: z.object({
    scores: z.array(
      AssessmentSubmissionRankingScoreSchema
    ),
    avgHorizontal: AssessmentSubmissionRankingScoreSchema,
    meta: z.array(AssessmentSubmissionRankingMetaSchema),
  }),
  maturityModel: MaturityModelSchema.extend({
    numberOfWebformAvailable: z.number().optional(),
  }),
  maturityModelID: z.string(),
});
export const AssessmentSubmissionReportResponseSchema =
  z.object({
    code: z.number(),
    message: z.string(),
    data: AssessmentReportSchema,
  });

export const RespondentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  department: z.string(),
  position: z.string(),
  tel: z.string(),
  email: z.string(),
  haveApprover: z.boolean(),
  approverID: z.string(),
  approverName: z.string(),
  active: z.boolean().optional(),
});

export const OrganizationRespondentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  count: z.number(),
  total: z.number(),
  branchs: z.array(
    z.object({
      ObjectUUID: z.string(),
      name: z.string(),
      count: z.number(),
      total: z.number(),
      isOverdue: z.boolean(),
    })
  ),
});

export const OrganizationRespondentResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationRespondentSchema),
  });

export const RespondentDataSourceSchema = z.object({
  organizationId: z.string(),
  organizationName: z.string(),
  branchId: z.string(),
  branchName: z.string(),
  ObjectUUID: z.string(),
  name: z.string(),
  department: z.string(),
  position: z.string(),
  tel: z.string(),
  email: z.string(),
  haveApprover: z.boolean(),
  approverID: z.string(),
  approverName: z.string(),
  approverEmail: z.string().optional(),
});
