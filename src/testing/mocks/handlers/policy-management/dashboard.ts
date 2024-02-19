import { rest } from 'msw';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getPolicyManagementPolicyDashboardHandler =
  rest.get(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/dashboard`,
    async (req, res, ctx) => {
      const data = testData.policyManagement.dashboard;

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

export const policyManagementPolicyDashboardHandlers = [
  getPolicyManagementPolicyDashboardHandler,
];
