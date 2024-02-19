import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

import { dsarAutomationWebformLanguageHandlers } from './language';
import { dsarAutomationWebformMetaHandlers } from './meta';
import { dsarAutomationWebformTemplateHandlers } from './template';
import { dsarAutomationWebformVersionHandlers } from './version';

const listDsarAutomationWebformHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.dsarAutomationWebform.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        webfromID: {
          contains: search,
        },
      },
    });

    const totalRecord = db.dsarAutomationWebform.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    const listData = data?.map((item) => ({
      webformID: item.webfromID,
      name: item.name,
      description: item.description,
      language: item.language,
      createdDt: item.createdDt,
      timeused: {
        unit: 'day',
        value: item.lifetime,
      },
      status: item.status,
      version: item.version,
    }));

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: listData,
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getDsarAutomationWebformHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/:webformId`,
  async (req, res, ctx) => {
    const webformId = req.params.webformId as string;

    const data = db.dsarAutomationWebform.findFirst({
      where: {
        webfromID: {
          equals: webformId,
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
        data: {
          ...data,
          form: undefined,
        },
      })
    );
  }
);

const createDsarAutomationWebformHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom`,
  async (req, res, ctx) => {
    const data = await req.json();

    const webform = db.dsarAutomationWebform.create({
      ...data,
      form: JSON.stringify(
        testData.dsarAutomation.webform.template
      ),
      detail: 'Thailand (PDPA)',
      webfromID: uid(),
      createdDt: new Date().toISOString(),
      createdBy: 'admin',
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          webformID: webform.webfromID,
        },
      })
    );
  }
);

const updateDsarAutomationWebformHandler = rest.put(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/:webformId`,
  async (req, res, ctx) => {
    const webformId = req.params.webformId as string;

    const data = await req.json();

    const updatedData = db.dsarAutomationWebform.update({
      where: {
        webfromID: {
          equals: webformId,
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

const deleteDsarAutomationWebformHandler = rest.delete(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/:webformId`,
  async (req, res, ctx) => {
    const webformId = req.params.webformId as string;

    const data = db.dsarAutomationWebform.delete({
      where: {
        webfromID: {
          equals: webformId,
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

const publishDsarAutomationWebformHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/publish/:webformId`,
  (req, res, ctx) => {
    const webformId = req.params.webformId as string;

    const webform = db.dsarAutomationWebform.findFirst({
      where: {
        webfromID: {
          equals: webformId,
        },
      },
    });

    if (!webform)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

    db.dsarAutomationWebform.update({
      where: {
        webfromID: {
          equals: webformId,
        },
      },
      data: {
        status: 'publish',
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

export const dsarAutomationWebformHandlers = [
  ...dsarAutomationWebformLanguageHandlers,
  ...dsarAutomationWebformMetaHandlers,
  ...dsarAutomationWebformTemplateHandlers,
  ...dsarAutomationWebformVersionHandlers,
  listDsarAutomationWebformHandler,
  getDsarAutomationWebformHandler,
  createDsarAutomationWebformHandler,
  updateDsarAutomationWebformHandler,
  deleteDsarAutomationWebformHandler,
  publishDsarAutomationWebformHandler,
];
