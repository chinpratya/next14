import { z } from 'zod';

import {
  GraphSchema,
  GraphMetaSchema,
  TableSchema,
  ReportResponseSchema,
  ListPortalAssessmentResponseSchema,
  listAssessors,
  PortalAssessmentDetailResponsSchema,
  MaturityModelReportSchema,
} from '../schemas/report';

export type Graph = z.infer<typeof GraphSchema>;

export type GraphMeta = z.infer<typeof GraphMetaSchema>;

export type Table = z.infer<typeof TableSchema> & {
  child?: Table[];
};
export type AssessmentRespondentsReport = z.infer<
  typeof ListPortalAssessmentResponseSchema
>;
export type ListAssessors = z.infer<typeof listAssessors>;
export type ReportResponse = z.infer<
  typeof ReportResponseSchema
>;

export type AssessmentRespondentsDetail = z.infer<
  typeof PortalAssessmentDetailResponsSchema
>;

export type MaturityModelReport = z.infer<
  typeof MaturityModelReportSchema
>;
