import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const listDsarAutomationRequestTaskHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/request/:requestId/subtask/:stateId`,
  (req, res, ctx) => {
    const data = db.dsarAutomationRequestTask.findMany(
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

const addDsarAutomationRequestTaskHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/work/:requestId/state/:stateId`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.dsarAutomationTask.create({
      ...data,
      workID: uid(),
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

export const dsarAutomationRequestTaskHandlers = [
  listDsarAutomationRequestTaskHandler,
  addDsarAutomationRequestTaskHandler,
];
