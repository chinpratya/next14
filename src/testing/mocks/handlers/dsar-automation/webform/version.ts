import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

const listDsarAutomationWebformVersionHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/:webformId/version`,
  (req, res, ctx) => {
    const data = db.dsarAutomationWebformVersion.findMany(
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

const getDsarAutomationWebformVersionHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/:webformId/version/:versionId`,
  (req, res, ctx) => {
    const webformId = req.params.webformId as string;
    const versionId = req.params.versionId as string;

    const webform = db.dsarAutomationWebform.findFirst({
      where: {
        webfromID: {
          equals: webformId,
        },
      },
    });

    const version =
      db.dsarAutomationWebformVersion.findFirst({
        where: {
          version: {
            equals: parseInt(versionId),
          },
        },
      });

    if (!webform || !version) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          statusCode: 404,
          message: 'Not Found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          form: testData.dsarAutomation.webform.template,
        },
      })
    );
  }
);

export const dsarAutomationWebformVersionHandlers = [
  listDsarAutomationWebformVersionHandler,
  getDsarAutomationWebformVersionHandler,
];
