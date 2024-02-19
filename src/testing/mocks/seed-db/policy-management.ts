import { testData } from '../../test-data';
import { db } from '../db';

export const policyManagementSeedDb = () => {
  testData?.policyManagement.tasks.list.forEach((item) =>
    db.policyManagementTasks.create(item)
  );
  testData?.policyManagement.assessments.list.forEach(
    (item) => db.policyManagementAssessments.create(item)
  );
  testData?.policyManagement.assessments.questionnaire.list.forEach(
    (item) =>
      db.policyManagementAssessmentsQuestionnaire.create(
        item
      )
  );
  testData?.policyManagement.assessments.questionnaire.version.forEach(
    (item) =>
      db.policyManagementAssessmentsQuestionnaireVersion.create(
        item
      )
  );
  testData?.policyManagement.policy.list.forEach((item) =>
    db.policyManagementPolicy.create(item)
  );
  testData?.policyManagement.policy.version.forEach(
    (item) =>
      db.policyManagementPolicyVersion.create(item)
  );
};
