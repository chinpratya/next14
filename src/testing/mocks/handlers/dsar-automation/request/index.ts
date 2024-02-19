import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

import { dsarAutomationRequestAssignHandlers } from './assign';
import { dsarAutomationRequestMetaHandlers } from './meta';
import { dsarAutomationRequestTaskHandlers } from './task';
import { dsarAutomationRequestVerificationHandlers } from './verification';

const listDsarAutomationRequestHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.dsarAutomationRequest.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        requestID: {
          contains: search,
        },
      },
    });

    const totalRecord = db.dsarAutomationRequest.count();
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

const createDsarAutomationRequestHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.dsarAutomationRequest.create({
      ...data,
      requestID: uid(),
      createDt: new Date().toISOString(),
      updatedBy: 'admin',
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

const getDsarAutomationRequestHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId`,
  async (req, res, ctx) => {
    const requestId = req.params.requestId as string;

    const data = db.dsarAutomationRequest.findFirst({
      where: {
        requestID: {
          equals: requestId,
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

const closeDsarAutomationRequestHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/close`,
  async (req, res, ctx) => {
    const requestId = req.params.requestId as string;

    db.dsarAutomationRequest.update({
      where: {
        requestID: {
          equals: requestId,
        },
      },
      data: {
        status: 'close',
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

const rejectDsarAutomationRequestHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/reject`,
  async (req, res, ctx) => {
    const requestId = req.params.requestId as string;

    db.dsarAutomationRequest.update({
      where: {
        requestID: {
          equals: requestId,
        },
      },
      data: {
        status: 'reject',
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

const getDsarAutomationRequestFormHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/form/:requestId`,
  async (req, res, ctx) => {
    const data = testData.dsarAutomation.request.form;

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

const updateDsarAutomationRequestStepBeforeHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/before`,
    async (req, res, ctx) => {
      const requestId = req.params.requestId as string;
      const data = await req.json();

      db.dsarAutomationRequest.update({
        where: {
          requestID: {
            equals: requestId,
          },
        },
        data: {
          ...data,
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

const updateDsarAutomationRequestStepNextHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/next`,
    async (req, res, ctx) => {
      const requestId = req.params.requestId as string;
      const data = await req.json();

      db.dsarAutomationRequest.update({
        where: {
          requestID: {
            equals: requestId,
          },
        },
        data: {
          ...data,
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

const updateDsarAutomationRequestTimelineHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/timeline/:requestId`,
    async (req, res, ctx) => {
      const requestId = req.params.requestId as string;
      const data = await req.json();

      db.dsarAutomationRequest.update({
        where: {
          requestID: {
            equals: requestId,
          },
        },
        data: {
          ...data,
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

const updateDsarAutomationRequestLanguageHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/language/:requestId`,
    async (req, res, ctx) => {
      const requestId = req.params.requestId as string;
      const data = await req.json();

      db.dsarAutomationRequest.update({
        where: {
          requestID: {
            equals: requestId,
          },
        },
        data: {
          ...data,
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

export const dsarAutomationRequestHandlers = [
  ...dsarAutomationRequestAssignHandlers,
  ...dsarAutomationRequestMetaHandlers,
  ...dsarAutomationRequestTaskHandlers,
  ...dsarAutomationRequestVerificationHandlers,
  listDsarAutomationRequestHandler,
  createDsarAutomationRequestHandler,
  getDsarAutomationRequestHandler,
  closeDsarAutomationRequestHandler,
  rejectDsarAutomationRequestHandler,
  getDsarAutomationRequestFormHandler,
  updateDsarAutomationRequestStepBeforeHandler,
  updateDsarAutomationRequestStepNextHandler,
  updateDsarAutomationRequestTimelineHandler,
  updateDsarAutomationRequestLanguageHandler,
];
