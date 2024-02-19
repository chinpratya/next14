import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../../../db';

const getOrganizationUserAuthSessionHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/session`,
  async (req, res, ctx) => {
    const profileSession =
      db.organizationUserAuthSession.getAll();

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: profileSession,
      })
    );
  }
);

const deleteOrganizationUserAuthSessionHandler =
  rest.delete(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/session/:sessionId`,
    async (req, res, ctx) => {
      const sessionId = req.params.sessionId as string;

      db.organizationUserAuthSession.delete({
        where: {
          session_id: {
            equals: sessionId,
          },
        },
      });

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

export const organizationUserAuthSessionHandlers = [
  getOrganizationUserAuthSessionHandler,
  deleteOrganizationUserAuthSessionHandler,
];
