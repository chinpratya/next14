import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const listDsarAutomationRequestVerificationHandler =
  rest.get(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/identify`,
    (req, res, ctx) => {
      const data =
        db.dsarAutomationRequestVerification.findMany({});

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

const addDsarAutomationRequestVerificationHandler =
  rest.post(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/identify`,
    async (req, res, ctx) => {
      const data = await req.json();

      db.dsarAutomationRequestVerification.create({
        ...data,
        identifyID: uid(),
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

const getDsarAutomationRequestVerificationHandler =
  rest.get(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/identify/:identifyId`,
    async (req, res, ctx) => {
      const identifyId = req.params.identifyId as string;

      const data =
        db.dsarAutomationRequestVerification.findFirst({
          where: {
            identifyID: {
              equals: identifyId,
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

const updateDsarAutomationRequestVerificationHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/identify/:identifyId`,
    async (req, res, ctx) => {
      const data = await req.json();
      const identifyId = req.params.identifyId as string;

      const verification =
        db.dsarAutomationRequestVerification.findFirst({
          where: {
            identifyID: {
              equals: identifyId,
            },
          },
        });

      const updatedData =
        db.dsarAutomationRequestVerification.update({
          where: {
            identifyID: {
              equals: identifyId,
            },
          },
          data: {
            ...verification,
            ...data,
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

export const dsarAutomationRequestVerificationHandlers = [
  listDsarAutomationRequestVerificationHandler,
  addDsarAutomationRequestVerificationHandler,
  getDsarAutomationRequestVerificationHandler,
  updateDsarAutomationRequestVerificationHandler,
];
