import {
  assessmentData,
  respondentsReport,
  ranking,
  assessment,
  listAssessors,
} from './assessment';
import { complianceReport } from './report';

export const portal = {
  data: assessmentData,
  respondentsReport,
  ranking,
  report: complianceReport,
  assessment,
  listAssessors,
};
