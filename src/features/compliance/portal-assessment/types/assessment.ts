import { z } from 'zod';

import { WebformBuilderItem } from '../../share';
import {
  PortalAssessmentSchema,
  ListPortalAssessmentResponseSchema,
  PortalAssessmentStatusSchema,
  PortalAssessmentIssueResponseSchema,
  ResultAssessmentSchema,
  ResultAssessmentResponseSchema,
  PortalIssueResponseSchema,
  ResultAssessmentDetailResponseSchema,
  ResultAssessmentDetailSchema,
  SettingResultchema,
  SettingResultResponseSchema,
} from '../schemas/assessment';

export type PortalAssessmentStatus = z.infer<
  typeof PortalAssessmentStatusSchema
>;

export type PortalAssessment = z.infer<
  typeof PortalAssessmentSchema
>;

export type ListPortalAssessmentResponse = z.infer<
  typeof ListPortalAssessmentResponseSchema
>;

export type AssessmentFormBuilder = WebformBuilderItem & {
  title: string;
  parent: AssessmentFormBuilder;
  children?: AssessmentFormBuilder[];
};

export type Respondent = {
  name: string;
  department: string;
  position: string;
  email: string;
  ObjectUUID: string;
  tel: string;
};

export type Institute = {
  ObjectUUID: string;
  name: string;
  respondents: Respondent[];
};

export type RespondentsReport = {
  ObjectUUID: string;
  name: string;
  orgType: string;
  industryGroup: string;
  businessCategory: string;
  institutes: Institute[];
};

export type RankingScore = {
  [key: string]: number | string;
  key: string;
  name: string;
  avg: number;
};

export type RankingMeta = {
  key: string;
  value: string;
};

export type Ranking = {
  scores: RankingScore[];
  avgHorizontal: RankingScore;
};

export type RankingResponse = {
  code: number;
  message: string;
  data: Ranking;
  meta: RankingMeta[];
};

export type AssessmentFieldsValue = {
  [key: string]: Record<
    string,
    Pick<WebformBuilderItem, 'value'>
  >;
};

export type IssueResponse = z.infer<
  typeof PortalAssessmentIssueResponseSchema
>;

export type ResultAssessment = z.infer<
  typeof ResultAssessmentSchema
>;

export type ResultResponseAssessment = z.infer<
  typeof ResultAssessmentResponseSchema
>;

export type PortalIssueType = z.infer<
  typeof PortalIssueResponseSchema
>;

export type ResultAssessmentDetailResponse = z.infer<
  typeof ResultAssessmentDetailResponseSchema
>;

export type ResultAssessmentDetail = z.infer<
  typeof ResultAssessmentDetailSchema
>;

export type SettingResultResponse = z.infer<
  typeof SettingResultResponseSchema
>;

export type SettingResult = z.infer<
  typeof SettingResultchema
>;
