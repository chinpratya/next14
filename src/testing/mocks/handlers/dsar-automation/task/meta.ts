import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getDsarAutomationTaskMetaHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/work/meta`,
  (req, res, ctx) => {
    const data = testData.dsarAutomation.task.meta;

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

export const dsarAutomationTaskMetaHandlers = [
  getDsarAutomationTaskMetaHandler,
];
