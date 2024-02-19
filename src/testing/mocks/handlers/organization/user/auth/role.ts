import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../../../db';

const getOrganizationUserAuthRoleHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/role`,
  (req, res, ctx) => {
    const roles = db.organizationUserAuthRole.findMany(
      {}
    );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: roles,
      })
    );
  }
);

export const organizationUserAuthRoleHandlers = [
  getOrganizationUserAuthRoleHandler,
];
