import { faker } from '@faker-js/faker';
import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';

const availableEmail = [
  {
    email: 'respondent@mail.com',
    role: 'respondent',
    code: faker.datatype.string(32),
  },
  {
    email: 'approver@mail.com',
    role: 'approver',
    code: faker.datatype.string(32),
  },
  {
    email: 'both@mail.com',
    role: 'both',
    code: faker.datatype.string(32),
  },
];

const otp = 123456;

const accessToken = faker.datatype.string(32);
const refreshToken = faker.datatype.string(32);

const loginCompliancePortalHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/login`,
  async (req, res, ctx) => {
    const data = await req.json();
    const user = availableEmail.find(
      (e) => e.email === data?.email
    );

    if (!user) {
      return res(
        ctx.status(401),
        ctx.delay(1000),
        ctx.json({
          message: 'This email is not registered.',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          code: user.code,
          expiresIn: 3600,
        },
      })
    );
  }
);

const verifyCompliancePortalHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/login/verify`,
  async (req, res, ctx) => {
    const data = await req.json();

    const user = availableEmail.find(
      (e) => e.code === data['code']
    );

    if (parseInt(data?.otp) !== otp || !user) {
      return res(
        ctx.status(401),
        ctx.delay(1000),
        ctx.json({
          message: 'This code or otp is not correct.',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          AccessToken: accessToken,
          AccessTokenExpiresIn: 3600,
          RefreshToken: refreshToken,
          RefreshTokenExpiresIn: 3600,
          role: user.role,
        },
      })
    );
  }
);

export const loginCompliancePortalHandlers = [
  loginCompliancePortalHandler,
  verifyCompliancePortalHandler,
];
