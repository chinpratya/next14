import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../../test-data';

const getOrganizationUserOrgPermission = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/permission`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: testData.organization.user.org.permission,
      })
    );
  }
);

export const organizationUserOrgPermissionHandlers = [
  getOrganizationUserOrgPermission,
];
