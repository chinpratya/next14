import { z } from 'zod';

import {
  AssessmentSchema,
  AssessmentResponseSchema,
  AssessmentSubmissionSchema,
  AssessmentSubmissionInfoSchema,
  AssessmentSubmissionResponseSchema,
  AssessmentSubmissionRespondentBranchRespondentSchema,
  AssessmentSubmissionAllRespondentSchema,
  AssessmentSubmissionRespondentsSchema,
  AssessmentSubmissionRespondentsResponseSchema,
  AssessmentSubmissionRespondentDetailSchema,
  AssessmentSubmissionRespondentDetailResponseSchema,
  AssessmentSubmissionRespondentDetailLogSchema,
  AssessmentSubmissionRespondentDetailLogResponseSchema,
  AssessmentSubmissionRespondentExtendTimeSchema,
  AssessmentSubmissionRespondentExtendTimeResponseSchema,
  AssessmentSubmissionSettingSchema,
  AssessmentSubmissionSettingResponseSchema,
  AssessmentSubmissionRankingScoreSchema,
  AssessmentSubmissionRankingMetaSchema,
  AssessmentSubmissionRankingSchema,
  AssessmentSubmissionRankingResponseSchema,
  AssessmentSubmissionReportResponseSchema,
  TableAssessmentSchema,
  GraphAssessmentSchema,
  GraphMetaAssessmentSchema,
  AssessmentSubmissionRespondentBranchSchema,
  AssessmentSubmissionSettingDateSchema,
  OrganizationRespondentSchema,
  OrganizationRespondentResponseSchema,
  AssessmentSubmissionRespondentDetailFormSchema,
  AssessmentSubmissionRespondentDetailCommentSchema,
  RespondentDataSourceSchema,
} from '../schemas';

export type Assessments = z.infer<
  typeof AssessmentSchema
>;

export type AssessmentResponse = z.infer<
  typeof AssessmentResponseSchema
>;

export type AssessmentSubmission = z.infer<
  typeof AssessmentSubmissionSchema
>;

export type AssessmentSubmissionInfo = z.infer<
  typeof AssessmentSubmissionInfoSchema
>;

export type AssessmentSubmissionResponse = z.infer<
  typeof AssessmentSubmissionResponseSchema
>;

export type AssessmentSubmissionRespondentBranchRespondent =
  z.infer<
    typeof AssessmentSubmissionRespondentBranchRespondentSchema
  >;

export type AssessmentSubmissionAllRespondent = z.infer<
  typeof AssessmentSubmissionAllRespondentSchema
>;

export type AssessmentSubmissionRespondents = z.infer<
  typeof AssessmentSubmissionRespondentsSchema
>;

export type AssessmentSubmissionRespondentsResponse =
  z.infer<
    typeof AssessmentSubmissionRespondentsResponseSchema
  >;

export type AssessmentSubmissionRespondentDetail =
  z.infer<
    typeof AssessmentSubmissionRespondentDetailSchema
  >;
export type AssessmentSubmissionRespondentDetailForm =
  z.infer<
    typeof AssessmentSubmissionRespondentDetailFormSchema
  >;

export type AssessmentSubmissionRespondentDetailComment =
  z.infer<
    typeof AssessmentSubmissionRespondentDetailCommentSchema
  >;

export type AssessmentSubmissionRespondentDetailResponse =
  z.infer<
    typeof AssessmentSubmissionRespondentDetailResponseSchema
  >;

export type AssessmentSubmissionRespondentDetailLog =
  z.infer<
    typeof AssessmentSubmissionRespondentDetailLogSchema
  >;

export type AssessmentSubmissionRespondentDetailLogResponse =
  z.infer<
    typeof AssessmentSubmissionRespondentDetailLogResponseSchema
  >;

export type AssessmentSubmissionRespondentExtendTime =
  z.infer<
    typeof AssessmentSubmissionRespondentExtendTimeSchema
  >;

export type AssessmentSubmissionRespondentExtendTimeResponse =
  z.infer<
    typeof AssessmentSubmissionRespondentExtendTimeResponseSchema
  >;

export type AssessmentSubmissionSetting = z.infer<
  typeof AssessmentSubmissionSettingSchema
>;

export type AssessmentSubmissionSettingDate = z.infer<
  typeof AssessmentSubmissionSettingDateSchema
>;

export type AssessmentSubmissionSettingResponse = z.infer<
  typeof AssessmentSubmissionSettingResponseSchema
>;

export type AssessmentSubmissionRankingScore = z.infer<
  typeof AssessmentSubmissionRankingScoreSchema
>;

export type AssessmentSubmissionRankingMeta = z.infer<
  typeof AssessmentSubmissionRankingMetaSchema
>;

export type AssessmentSubmissionRanking = z.infer<
  typeof AssessmentSubmissionRankingSchema
>;

export type AssessmentSubmissionRankingResponse = z.infer<
  typeof AssessmentSubmissionRankingResponseSchema
>;

export type AssessmentSubmissionReportResponse = z.infer<
  typeof AssessmentSubmissionReportResponseSchema
>;

export type GraphAssessment = z.infer<
  typeof GraphAssessmentSchema
>;

export type GraphMetaAssessment = z.infer<
  typeof GraphMetaAssessmentSchema
>;

export type TableReport = z.infer<
  typeof TableAssessmentSchema
> & {
  child?: TableReport[];
};

export type Branch = z.infer<
  typeof AssessmentSubmissionRespondentBranchSchema
>;

export type OrganizationRespondent = z.infer<
  typeof OrganizationRespondentSchema
>;

export type OrganizationRespondentResponse = z.infer<
  typeof OrganizationRespondentResponseSchema
>;

export type RespondentDataSource = z.infer<
  typeof RespondentDataSourceSchema
>;

export type SelectedRespondent = {
  [organizationId: string]: {
    id: string;
    name: string;
    branchs: {
      [branchId: string]: {
        id: string;
        name: string;
        indeterminate?: boolean;
        respondents: AssessmentSubmissionRespondentBranchRespondent[];
      };
    };
  };
};

export type SelectedBranch = {
  organizeIndex?: number;
  organizeId?: string;
  branchId?: string;
};

export type BasicInfoDetail = {
  assessmentName: string;
  group: string;
  name: string;
};

export type DeadlineDetail = {
  dateDt: string;
  isNotification: boolean;
  isSchedule: boolean;
  isSetDt: boolean;
  notifications: {
    notiType: string;
    notiDt: string;
  }[];
  scheduleDt: undefined;
};
