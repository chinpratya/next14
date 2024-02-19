import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const createDsarAutomationWorkflowStageTaskHandler =
  rest.post(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/state/:stageId/task`,
    async (req, res, ctx) => {
      const body = await req.json();

      const delegates = body?.delegateID?.map(
        (delegateId: string) =>
          db.dsarAutomationWorkflowUser.findFirst({
            where: {
              userID: {
                equals: delegateId,
              },
            },
          })
      );

      const reminded = body?.reminded?.map(
        (remindedItem: any) =>
          db.dsarAutomationWorkflowTaskReminded.create({
            ...remindedItem,
            id: uuidv4(),
          })
      );

      const delegateID = delegates?.map(
        (delegate: any) => delegate?.userID
      );
      const delegateName = delegates?.map(
        (delegate: any) => delegate?.name
      );

      db.dsarAutomationWorkflowTask.create({
        ...body,
        taskID: uuidv4(),
        delegateID,
        delegateName,
        reminded,
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

const updateDsarAutomationWorkflowStageTaskHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/state/:stageId/task/:taskId`,
    async (req, res, ctx) => {
      const taskId = req.params.taskId as string;
      const body = await req.json();

      const delegates = body?.delegateID?.map(
        (delegateId: string) =>
          db.dsarAutomationWorkflowUser.findFirst({
            where: {
              userID: {
                equals: delegateId,
              },
            },
          })
      );

      const reminded = body?.reminded?.map(
        (remindedItem: any) =>
          db.dsarAutomationWorkflowTaskReminded.create({
            ...remindedItem,
            id: uuidv4(),
          })
      );

      const delegateID = delegates?.map(
        (delegate: any) => delegate?.userID
      );
      const delegateName = delegates?.map(
        (delegate: any) => delegate?.name
      );

      db.dsarAutomationWorkflowTask.update({
        where: {
          taskID: {
            equals: taskId,
          },
        },
        data: {
          ...body,
          delegateID,
          delegateName,
          reminded,
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

const listDsarAutomationWorkflowStageTaskHandler =
  rest.get(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/state/:stageId/task`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams?.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data = db.dsarAutomationWorkflowTask.findMany(
        {
          take: parseInt(pageSize),
          skip: (parseInt(page) - 1) * parseInt(pageSize),
        }
      );

      const totalRecord =
        db.dsarAutomationWorkflow.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      const responseData = data.map((item) => ({
        taskID: item.taskID,
        name: item.name,
        delegateID: item.delegateID,
        priority: item.priority,
        endDate: item.endDate,
        delegateName: item.delegateName,
        isAPI: item.isAPI,
        IdentifyTask: item.IdentifyTask,
        requiredJob: item.requiredJob,
        resolutionCloseJob: item.resolutionCloseJob,
        resolutionEndJob: item.resolutionEndJob,
        isCloseIfReject: item.isCloseIfReject,
      }));

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: responseData,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getDsarAutomationWorkflowStageTaskHandler =
  rest.get(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/state/:stageId/task/:taskId`,
    (req, res, ctx) => {
      const taskId = req.params.taskId as string;

      const data =
        db.dsarAutomationWorkflowTask.findFirst({
          where: {
            taskID: {
              equals: taskId,
            },
          },
        });

      if (!data) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'not found',
          })
        );
      }

      const responseData = {
        taskID: data.taskID,
        name: data.name,
        delegateID: data.delegateID,
        priority: data.priority,
        isAPI: data.isAPI,
        apiURL: data.apiURL,
        IdentifyTask: data.IdentifyTask,
        description: data.description,
        requiredJob: data.requiredJob,
        resolutionCloseJob: data.resolutionCloseJob,
        resolutionEndJob: data.resolutionEndJob,
        endDate: data.endDate,
        reminded: data.reminded,
        isSetNotificationTime: data.isSetNotificationTime,
        isCloseIfReject: data.isCloseIfReject,
      };

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: responseData,
        })
      );
    }
  );

const deleteDsarAutomationWorkflowStageTaskHandler =
  rest.delete(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/state/:stageId/task/:taskId`,
    (req, res, ctx) => {
      const taskId = req.params.taskId as string;

      db.dsarAutomationWorkflowTask.delete({
        where: {
          taskID: {
            equals: taskId,
          },
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

export const dsarAutomationWorkflowTaskHandlers = [
  createDsarAutomationWorkflowStageTaskHandler,
  listDsarAutomationWorkflowStageTaskHandler,
  updateDsarAutomationWorkflowStageTaskHandler,
  getDsarAutomationWorkflowStageTaskHandler,
  deleteDsarAutomationWorkflowStageTaskHandler,
];
