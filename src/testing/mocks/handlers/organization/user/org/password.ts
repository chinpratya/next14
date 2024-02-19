import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const createOrganizationInitPassword = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/init-password`,
  async (req, res, ctx) => {
    const payload = await req.json();

    const internal = db.organizationInitPassword.create({
      ...payload.internal,
    });
    const external =
      db.organizationInitPasswordExternal.create({
        ...payload.external,
      });

    const data = {
      internal: { ...internal },
      external: {
        ...external,
      },
    };

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

const getOrganizationInitPassword = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/init-password`,
  async (req, res, ctx) => {
    const data = db.organizationInitPassword.getAll();
    const dataExtenal =
      db.organizationInitPasswordExternal.getAll();

    const password = {
      internal: {
        ...data[data.length - 1],
      },
      external: {
        ...dataExtenal[dataExtenal.length - 1],
      },
    };

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: password,
      })
    );
  }
);

export const organizationInitPasswordHandlers = [
  createOrganizationInitPassword,
  getOrganizationInitPassword,
];
