import { rest } from 'msw';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const listPolicyManagementTasksHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/tasks`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.policyManagementTasks.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        ObjectUUID: {
          contains: search,
        },
      },
    });

    const totalRecord = db.policyManagementTasks.count();
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

const getPolicyManagementTasksHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/tasks/:taskId`,
  async (req, res, ctx) => {
    const taskId = req.params.taskId as string;

    const data = db.policyManagementTasks.findFirst({
      where: {
        ObjectUUID: {
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

const updatePolicyManagementTasksHandler = rest.put(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/tasks/:taskId`,
  async (req, res, ctx) => {
    const taskId = req.params.taskId as string;
    const data = await req.json();

    const updatedData = db.policyManagementTasks.update({
      where: {
        ObjectUUID: {
          equals: taskId,
        },
      },
      data: {
        ...data,
        updated_at: new Date().toISOString(),
        updated_by: 'Admin',
      },
    });

    if (!updatedData)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'not found',
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

export const PolicyManagementTasksHandlers = [
  listPolicyManagementTasksHandler,
  getPolicyManagementTasksHandler,
  updatePolicyManagementTasksHandler,
];
