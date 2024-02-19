import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const createDsarAutomationWorkflowStageHandler =
  rest.post(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/stages`,
    async (req, res, ctx) => {
      const workflowId = req.params.workflowId as string;
      const requestBody = await req.json();

      const newStage =
        db.dsarAutomationWorkflowStage.create({
          ...requestBody,
          stageID: uid(),
        });

      const workflow = db.dsarAutomationWorkflow.update({
        where: {
          workflowID: {
            equals: workflowId,
          },
        },
        data: {
          stages: (prev) => [...prev, newStage],
        },
      });

      if (!workflow) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
          data: {
            stages: workflow.stages,
          },
        })
      );
    }
  );

const deleteDsarAutomationWorkflowStageHandler =
  rest.delete(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/stages/:stageId`,
    async (req, res, ctx) => {
      const workflowId = req.params.workflowId as string;
      const stageId = req.params.stageId as string;

      const workflow = db.dsarAutomationWorkflow.update({
        where: {
          workflowID: {
            equals: workflowId,
          },
        },
        data: {
          stages: (prev) =>
            prev.filter(
              (stage) => stage.stageID !== stageId
            ),
        },
      });

      if (!workflow) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
          data: {
            stages: workflow.stages,
          },
        })
      );
    }
  );

const updateDsarAutomationWorkflowStageHandler = rest.put(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId/stages/:stageId`,
  async (req, res, ctx) => {
    const workflowId = req.params.workflowId as string;
    const stageId = req.params.stageId as string;
    const requestBody = await req.json();

    const newStage =
      db.dsarAutomationWorkflowStage.update({
        where: {
          stageID: {
            equals: stageId,
          },
        },
        data: {
          ...requestBody,
        },
      });

    const workflow = db.dsarAutomationWorkflow.findFirst({
      where: {
        workflowID: {
          equals: workflowId,
        },
      },
    });

    if (!workflow || !newStage) {
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data: {
          stages: workflow.stages,
        },
      })
    );
  }
);

export const dsarAutomationWorkflowStagesHandlers = [
  createDsarAutomationWorkflowStageHandler,
  deleteDsarAutomationWorkflowStageHandler,
  updateDsarAutomationWorkflowStageHandler,
];
