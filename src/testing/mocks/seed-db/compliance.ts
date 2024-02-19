import { testData } from '../../test-data';
import { db } from '../db';

export const complianceSeedDb = () => {
  testData?.compliance.icon.list?.forEach((item) =>
    db.complianceIcon.create(item)
  );
  testData?.compliance.setting.organization.list?.forEach(
    (item) => db.complianceOrganizationList.create(item)
  );
  testData?.compliance?.setting?.maturityModel?.list?.forEach(
    (item) => {
      const detail = item?.detail.map((detailItem) =>
        db.complianceSettingMaturityDetailModel.create(
          detailItem
        )
      );
      db.complianceSettingMaturityModel.create({
        ...item,
        detail,
      });
    }
  );
  testData?.compliance.setting.organization.listContact?.forEach(
    (item) =>
      db.complianceOrganizationContact.create(item)
  );
  testData?.compliance.setting.organization.listInstitute?.forEach(
    (item) =>
      db.complianceOrganizationInstitute.create(item)
  );
  testData?.compliance.setting.organization.listInstituteRespondent?.forEach(
    (item) =>
      db.complianceOrganizationInstituteRespondent.create(
        item
      )
  );
  testData?.compliance.setting.organization.listInstituteApprover?.forEach(
    (item) =>
      db.complianceOrganizationInstituteApprover.create(
        item
      )
  );
  testData?.compliance.setting.organization.listInstituteApproverRespondentOption.forEach(
    (item) =>
      db.complianceOrganizationInstituteApproverRespondent.create(
        item
      )
  );
  testData?.compliance.setting.organization.listInstituteAssignment?.forEach(
    (item) =>
      db.complianceOrganizationInstituteAssignment.create(
        item
      )
  );
  testData?.compliance.setting.organization.listInstituteAssignmentRespondent?.forEach(
    (item) =>
      db.complianceOrganizationInstituteAssignmentRespondent.create(
        item
      )
  );
  testData?.compliance.setting.organization.listInstituteAssignmentGrowth?.forEach(
    (item) =>
      db.complianceOrganizationInstituteAssignmentGrowth.create(
        item
      )
  );
  testData?.compliance.assessment.list.forEach((item) =>
    db.complianceAssessmentModel.create(item)
  );
  testData?.compliance.assessmentSubmission.list?.forEach(
    (item) =>
      db.complianceAssessmentSubmission.create(item)
  );
  db.complianceAssessmentSubmissionInfo.create(
    testData.compliance.assessmentSubmission.info
  );
  testData?.compliance.assessmentSubmission.respondent?.forEach(
    (item) =>
      db.complianceAssessmentSubmissionRespondent.create(
        item
      )
  );
  testData?.compliance.assessmentSubmission.respondentLog?.forEach(
    (item) =>
      db.complianceAssessmentSubmissionRespondentLog.create(
        item
      )
  );
  db.complianceAssessmentSubmissionSetting.create(
    testData.compliance.assessmentSubmission
      .assessmentSubmissionSetting
  );
  // db.complianceAssessmentSubmissionReport.create(
  //   testData.compliance.assessmentSubmission.report
  // );

  testData?.compliance.portal?.assessment?.list?.forEach(
    (item) =>
      db.compliancePortalAssessment.create({
        ...item,
        form: JSON.stringify(
          testData.compliance.assessment.form
        ),
      })
  );
  testData?.compliance.portal?.assessment?.form?.comment?.forEach(
    (item) =>
      db.compliancePortalAssessmentFormComment.create(
        item
      )
  );
  testData?.compliance.assessment.form.forEach((item) => {
    // item?.children?.forEach((child) =>
    //   db.compliancePortalAssessmentFormCommentIssue.create(
    //     {
    //       formId: child.key,
    //       haveIssue: false,
    //       status: 'approved',
    //     }
    //   )
    // );
    db.compliancePortalAssessmentFormCommentIssue.create({
      formId: item.key,
      haveIssue: false,
      status: 'approved',
    });
  });
};
