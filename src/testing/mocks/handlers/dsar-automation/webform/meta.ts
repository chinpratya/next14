import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getDsarAutomationWebformMetaHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/meta`,
  (req, res, ctx) => {
    const data = testData.dsarAutomation.webform.meta;

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

export const dsarAutomationWebformMetaHandlers = [
  getDsarAutomationWebformMetaHandler,
];
