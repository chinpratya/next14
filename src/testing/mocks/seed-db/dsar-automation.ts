import { v4 as uuidv4 } from 'uuid';

import { testData } from '../../test-data';
import { db } from '../db';

export const dsarAutomationSeedDb = () => {
  testData?.dsarAutomation.webform.list.forEach(
    (item) => {
      db.dsarAutomationWebform.create({
        ...item,
        form: JSON.stringify(
          testData.dsarAutomation.webform.template
        ),
      });
    }
  );
  testData?.dsarAutomation.webform.version.forEach(
    (item) => db.dsarAutomationWebformVersion.create(item)
  );

  testData.dsarAutomation.tags.forEach((item) =>
    db.dsarAutomationTags.create(item)
  );

  testData?.dsarAutomation.task.list.forEach((item) =>
    db.dsarAutomationTask.create(item)
  );

  testData?.dsarAutomation.task.version.forEach((item) =>
    db.dsarAutomationTaskVersion.create(item)
  );

  testData?.dsarAutomation.request.list.forEach((item) =>
    db.dsarAutomationRequest.create(item)
  );
  testData?.dsarAutomation.request.task.forEach((item) =>
    db.dsarAutomationRequestTask.create(item)
  );
  testData?.dsarAutomation.request.verification.forEach(
    (item) =>
      db.dsarAutomationRequestVerification.create(item)
  );

  const users =
    testData?.organization.user.org.users.listUser;
  const userDb = users
    ?.filter((_, index) => index < 3)
    .map((user) =>
      db.dsarAutomationWorkflowUser.create({
        id: uuidv4(),
        userID: user.userId,
        name: `${user.first_name} ${user.last_name}`,
        position: '',
        organization: user.organization_labels,
      })
    );

  testData?.dsarAutomation.workflow.list.forEach(
    ({ stages, ...item }) => {
      const stagesDb = stages.map((stage) =>
        db.dsarAutomationWorkflowStage.create(stage)
      );

      db.dsarAutomationWorkflow.create({
        ...item,
        stages: stagesDb,
        users: userDb,
      });
    }
  );

  testData?.dsarAutomation.workflow.tasks.forEach(
    ({ reminded, ...task }) => {
      const remindedDb = reminded.map((item) =>
        db.dsarAutomationWorkflowTaskReminded.create(item)
      );

      db.dsarAutomationWorkflowTask.create({
        ...task,
        reminded: remindedDb,
      });
    }
  );
};
