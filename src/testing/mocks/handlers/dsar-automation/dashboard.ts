import { rest } from 'msw';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getDsarAutomationWorkflowDashboardHandler =
  rest.get(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/dashboard`,
    async (req, res, ctx) => {
      const data = testData.dsarAutomation.dashboard;

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
          data: data,
        })
      );
    }
  );

export const dsarAutomationDashboardHandlers = [
  getDsarAutomationWorkflowDashboardHandler,
];
