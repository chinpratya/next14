import { complianceAssessmentModel } from './assessment';
import {
  complianceAssessmentSubmission,
  complianceAssessmentSubmissionRespondent,
  complianceAssessmentSubmissionRespondentAddRespondent,
  complianceAssessmentSubmissionRespondentChangeApprover,
  complianceAssessmentSubmissionRespondentLog,
  complianceAssessmentSubmissionRespondentExtendTime,
  complianceAssessmentSubmissionSetting,
  complianceAssessmentSubmissionInfo,
  complianceAssessmentSubmissionOrganizationRespondent,
} from './assessment-submission';
import { complianceIcon } from './icon';
import {
  compliancePortalAssessmentFormComment,
  compliancePortalAssessmentFormCommentIssue,
  compliancePortalAssessment,
} from './portal';
import {
  complianceSettingMaturityDetailModel,
  complianceSettingMaturityModel,
  complianceOrganizationList,
  complianceOrganizationContact,
  complianceOrganizationInstitute,
  complianceOrganizationInstituteRespondent,
  complianceOrganizationInstituteApprover,
  complianceOrganizationInstituteApproverRespondent,
  complianceOrganizationInstituteAssignment,
  complianceOrganizationInstituteAssignmentRespondent,
  complianceOrganizationInstituteAssignmentGrowth,
} from './setting';

export const complianceModels = {
  complianceAssessmentModel,
  complianceIcon,
  complianceOrganizationList,
  complianceOrganizationContact,
  complianceSettingMaturityDetailModel,
  complianceSettingMaturityModel,
  complianceOrganizationInstitute,
  complianceOrganizationInstituteRespondent,
  complianceOrganizationInstituteApprover,
  complianceOrganizationInstituteApproverRespondent,
  complianceOrganizationInstituteAssignment,
  complianceOrganizationInstituteAssignmentRespondent,
  complianceOrganizationInstituteAssignmentGrowth,
  complianceAssessmentSubmission,
  complianceAssessmentSubmissionRespondent,
  complianceAssessmentSubmissionRespondentAddRespondent,
  complianceAssessmentSubmissionRespondentChangeApprover,
  complianceAssessmentSubmissionRespondentLog,
  complianceAssessmentSubmissionRespondentExtendTime,
  complianceAssessmentSubmissionSetting,
  compliancePortalAssessmentFormComment,
  compliancePortalAssessmentFormCommentIssue,
  compliancePortalAssessment,
  complianceAssessmentSubmissionInfo,
  complianceAssessmentSubmissionOrganizationRespondent,
};
