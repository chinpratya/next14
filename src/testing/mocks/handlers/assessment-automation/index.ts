import { complianceAssessmentHandlers } from './assessment';
import { complianceAssessmentDashBoardHandlers } from './assessment-dashboard';
import { complianceAssessmentSubmissionHandlers } from './assessment-submission';
import { complianceIconHandlers } from './icon';
import { compliancePortalHandlers } from './portal';
import { complianceSettingHandlers } from './setting';

export const complianceHandlers = [
  ...complianceAssessmentHandlers,
  ...complianceAssessmentSubmissionHandlers,
  ...complianceIconHandlers,
  ...compliancePortalHandlers,
  ...complianceSettingHandlers,
  ...complianceAssessmentDashBoardHandlers,
];
