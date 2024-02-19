import _ from 'lodash';
import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const listDSARAutomationWorkflowUserHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/users`,
  (req, res, ctx) => {
    const workflowId = req.params.workflowId as string;

    const workflow = db.dsarAutomationWorkflow.findFirst({
      where: { workflowID: { equals: workflowId } },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data:
          workflow?.users?.map((user) => ({
            ...user,
            id: undefined,
          })) ?? [],
      })
    );
  }
);

const addDSARAutomationWorkflowUserHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/users`,
  async (req, res, ctx) => {
    const workflowId = req.params.workflowId as string;
    const { userID } = (await req.json()) as {
      userID: string[];
    };

    const workflow = db.dsarAutomationWorkflow.findFirst({
      where: { workflowID: { equals: workflowId } },
    });

    const users =
      (userID?.map((id) => {
        const user =
          db.organizationUserOrgUsers.findFirst({
            where: { userId: { equals: id } },
          });

        return db.dsarAutomationWorkflowUser.create({
          id: uid(),
          userID: user?.userId ?? '',
          name: `${user?.first_name} ${user?.last_name}`,
          position: 'example',
          organization: user?.organization_labels ?? [],
        });
      }) as any) ?? [];

    db.dsarAutomationWorkflow.update({
      where: { workflowID: { equals: workflowId } },
      data: {
        users: _.concat(workflow?.users, users),
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

export const dsarAutomationWorkflowUserHandlers = [
  listDSARAutomationWorkflowUserHandler,
  addDSARAutomationWorkflowUserHandler,
];
