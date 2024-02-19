import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';

const getOrganizationUserAuthSendSmsOtpHandler =
  rest.post(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/send/smsotp`,
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

export const organizationUserAuthSendSmsOtpHandlers = [
  getOrganizationUserAuthSendSmsOtpHandler,
];
