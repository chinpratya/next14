import { rest } from 'msw';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

const listPolicyManagementPolicyVersionHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId/versions`,
  (req, res, ctx) => {
    const data =
      db.policyManagementPolicyVersion.findMany({});

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data,
      })
    );
  }
);

const getPolicyManagementPolicyVersionHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId/versions/:versionId`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: testData.policyManagement.policy.version,
      })
    );
  }
);

export const policyManagementPolicyVersionHandlers = [
  listPolicyManagementPolicyVersionHandler,
  getPolicyManagementPolicyVersionHandler,
];
