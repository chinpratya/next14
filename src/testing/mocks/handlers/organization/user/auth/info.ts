import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../../test-data';
import { db } from '../../../../db';

const getOrganizationUserAuthInfoHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/info`,
  async (req, res, ctx) => {
    const user = db.organizationUserAuthInfo.findMany({});

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: user[0],
      })
    );
  }
);

const updateOrganizationUserAuthInfoHandler = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/info`,
  async (req, res, ctx) => {
    const data = await req.json();
    const user = testData.organization.user.auth.info;

    const organizationUserAuthInfo =
      db.organizationUserAuthInfo.update({
        where: {
          id: {
            equals: user.id,
          },
        },
        data: {
          ...data,
        },
      });

    if (!organizationUserAuthInfo) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find User!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '',
      })
    );
  }
);

export const organizationUserAuthInfoHandlers = [
  getOrganizationUserAuthInfoHandler,
  updateOrganizationUserAuthInfoHandler,
];
