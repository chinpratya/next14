import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

import { dsarAutomationWorkflowStagesHandlers } from './stages';
import { dsarAutomationWorkflowTaskHandlers } from './tasks';
import { dsarAutomationWorkflowUserHandlers } from './user';

const getWorkflowStage =
  testData.dsarAutomation.workflow.getWorkflowStage;

const listDsarAutomationWorkflowHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.dsarAutomationWorkflow.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        name: {
          contains: search,
        },
      },
    });

    const totalRecord = db.dsarAutomationWorkflow.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: data.map((item) => ({
          ...item,
          users: undefined,
        })),
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const createDsarAutomationWorkflowHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow`,
  async (req, res, ctx) => {
    const data = await req.json();

    const stages = getWorkflowStage();
    const stagesDb = stages.map((stage) =>
      db.dsarAutomationWorkflowStage.create(stage)
    );

    const tagName = testData.dsarAutomation.tags
      .filter((tag) => data.tagID.includes(tag.tagID))
      .map((tag) => tag.name);

    const workflow = db.dsarAutomationWorkflow.create({
      ...data,
      workflowID: uid(),
      created_dt: new Date().toISOString(),
      createdBy: 'admin',
      updated_dt: '',
      status: 'active',
      tagID: data.tagID,
      tagName,
      stages: stagesDb,
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          ObjectUUID: workflow.workflowID,
          name: workflow.name,
        },
      })
    );
  }
);

const publishDsarAutomationWorkflowHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/publish/:workflowId`,
  async (req, res, ctx) => {
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

const deleteDsarAutomationWorkflowHandler = rest.delete(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId`,
  async (req, res, ctx) => {
    const workflowId = req.params.workflowId as string;

    const data = db.dsarAutomationWorkflow.delete({
      where: {
        workflowID: {
          equals: workflowId,
        },
      },
    });

    if (!data)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const getDsarAutomationWorkflowHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/:workflowId`,
  async (req, res, ctx) => {
    const workflowId = req.params.workflowId as string;

    const data = db.dsarAutomationWorkflow.findFirst({
      where: {
        workflowID: {
          equals: workflowId,
        },
      },
    });

    if (!data)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data: {
          ...data,
          users: undefined,
        },
      })
    );
  }
);

const getDsarAutomationWorkflowMetaHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/workflow/meta/sas`,
  async (req, res, ctx) => {
    const data = testData.dsarAutomation.workflow.meta;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data: data,
      })
    );
  }
);
export const dsarAutomationWorkFlowHandlers = [
  ...dsarAutomationWorkflowStagesHandlers,
  ...dsarAutomationWorkflowTaskHandlers,
  ...dsarAutomationWorkflowUserHandlers,
  listDsarAutomationWorkflowHandler,
  createDsarAutomationWorkflowHandler,
  getDsarAutomationWorkflowHandler,
  deleteDsarAutomationWorkflowHandler,
  publishDsarAutomationWorkflowHandler,
  getDsarAutomationWorkflowMetaHandler,
];
