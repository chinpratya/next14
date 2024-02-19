import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';

const organizationUserSigninHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/signin`,
  async (req, res, ctx) => {
    const { username, password, organization } =
      await req.json();

    if (
      username !== 'frontend@mail.com' ||
      password !== 'Password02!' ||
      organization !== 'test'
    ) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          code: 400,
          message: 'Username or password is incorrect',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: testData.organization.user.signin,
      })
    );
  }
);

export const organizationUserSigninHandlers = [
  organizationUserSigninHandler,
];
