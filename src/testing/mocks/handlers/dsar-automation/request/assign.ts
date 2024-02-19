import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const updateDsarAutomationRequestAssignHandler = rest.put(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/assign/:requestId`,
  async (req, res, ctx) => {
    const requestId = req.params.requestId as string;

    const data = await req.json();

    const updatedData = db.dsarAutomationRequest.update({
      where: {
        requestID: {
          equals: requestId,
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

export const dsarAutomationRequestAssignHandlers = [
  updateDsarAutomationRequestAssignHandler,
];
