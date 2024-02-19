import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

import { dsarAutomationTaskMetaHandlers } from './meta';

const listDsarAutomationTaskHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/work`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.dsarAutomationTask.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        workID: {
          contains: search,
        },
      },
    });

    const totalRecord = db.dsarAutomationTask.count();
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
        data: data,
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getDsarAutomationTaskHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/work/:workId`,
  async (req, res, ctx) => {
    const workId = req.params.workId as string;

    const data = db.dsarAutomationTask.findFirst({
      where: {
        workID: {
          equals: workId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data,
      })
    );
  }
);

const updateDsarAutomationTaskStatusHandler = rest.put(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/work/status/:workId`,
  async (req, res, ctx) => {
    const workId = req.params.workId as string;

    const data = await req.json();

    const updatedData = db.dsarAutomationTask.update({
      where: {
        workID: {
          equals: workId,
        },
      },
      data: {
        ...data,
        updatedDt: new Date().toISOString(),
        updatedBy: 'admin',
      },
    });

    if (!updatedData)
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

const listDsarAutomationTaskVersionHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/work/:workId/version`,
  (req, res, ctx) => {
    const data = db.dsarAutomationTaskVersion.findMany(
      {}
    );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

export const dsarAutomationTaskHandlers = [
  ...dsarAutomationTaskMetaHandlers,
  listDsarAutomationTaskHandler,
  getDsarAutomationTaskHandler,
  updateDsarAutomationTaskStatusHandler,
  listDsarAutomationTaskVersionHandler,
];
