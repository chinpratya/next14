import { compliancePortalAssessmentHandlers } from './assessment';
import { compliancePortalAssessmentApproveHandlers } from './assessment-approve';
import { loginCompliancePortalHandlers } from './login';
import { reportCompliancePortalHandlers } from './report';

export const compliancePortalHandlers = [
  ...compliancePortalAssessmentHandlers,
  ...compliancePortalAssessmentApproveHandlers,
  ...loginCompliancePortalHandlers,
  ...reportCompliancePortalHandlers,
];
