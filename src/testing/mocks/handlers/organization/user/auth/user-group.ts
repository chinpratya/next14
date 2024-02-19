import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../../../db';

const getOrganizationUserAuthUserGroupHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/group`,
  (req, res, ctx) => {
    const userGroups =
      db.organizationUserAuthUserGroup.findMany({});

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: userGroups,
      })
    );
  }
);

export const organizationUserAuthUserGroupHandlers = [
  getOrganizationUserAuthUserGroupHandler,
];
