import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';
import { testData } from '@/testing/test-data';

const getOrganizationUserAuthMetaHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/meta`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: testData.organization.user.auth.meta,
      })
    );
  }
);

export const organizationUserAuthMetaHandlers = [
  getOrganizationUserAuthMetaHandler,
];
