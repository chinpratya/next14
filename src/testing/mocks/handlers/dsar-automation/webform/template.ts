import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const getDsarAutomationWebformTemplateHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/template/:webformId`,
  (req, res, ctx) => {
    const webformId = req.params.webformId as string;

    const data = db.dsarAutomationWebform.findFirst({
      where: {
        webfromID: {
          equals: webformId,
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
          form: JSON.parse(data.form),
          Language: 'th-TH',
        },
      })
    );
  }
);

const updateDsarAutomationWebformTemplateHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/template/:webformId`,
    async (req, res, ctx) => {
      const webformId = req.params.webformId as string;
      const requestBody = await req.json();

      const data = db.dsarAutomationWebform.findFirst({
        where: {
          webfromID: {
            equals: webformId,
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
            message: 'Not Found',
          })
        );
      }

      db.dsarAutomationWebform.update({
        where: {
          webfromID: {
            equals: webformId,
          },
        },
        data: {
          form: JSON.stringify(requestBody.form),
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

export const dsarAutomationWebformTemplateHandlers = [
  getDsarAutomationWebformTemplateHandler,
  updateDsarAutomationWebformTemplateHandler,
];
