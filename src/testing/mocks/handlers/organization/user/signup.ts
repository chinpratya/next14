import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';
import { uid } from '@/utils';

import { testData } from '../../../../test-data';

const organizationUserSignupHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/signup`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          user_id: uid(),
          organization_short_name: 'test',
        },
      })
    );
  }
);

const getOrganizationUserSignupMetaHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/signup/meta`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data: testData.organization.user.signup.meta,
      })
    );
  }
);

const organizationUserSignupResendVerifyHandler =
  rest.post(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/signup/resendVerify`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

export const organizationUserSignupHandlers = [
  organizationUserSignupHandler,
  getOrganizationUserSignupMetaHandler,
  organizationUserSignupResendVerifyHandler,
];
