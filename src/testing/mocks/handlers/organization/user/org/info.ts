import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../../test-data';
import { db } from '../../../../db';

const ORGANIZATION_ID =
  '2146fb54-fc59-4da9-ad90-11cb0f7e2d7e';

const getOrganizationUserOrgInfo = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/info`,
  (req, res, ctx) => {
    const info =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: ORGANIZATION_ID,
          },
        },
      });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: info,
      })
    );
  }
);

const updateOrganizationUserOrgInfo = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/info`,
  async (req, res, ctx) => {
    const data = await req.json();

    const info =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: ORGANIZATION_ID,
          },
        },
      });

    if (!info) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    db.organizationUserOrgDepartment.update({
      where: {
        departmentId: {
          equals: ORGANIZATION_ID,
        },
      },
      data: {
        ...info,
        ...data,
        updatedDt: new Date().toISOString(),
        updatedBy: 'frontend developer',
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

const updateOrganizationUserOrgAdmin = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/admin`,
  async (req, res, ctx) => {
    const data = testData.organization.user.org.info;

    const orgAdmin = db.organizationUserAuthInfo.update({
      where: {
        id: {
          equals: data.departmentId,
        },
      },
      data,
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: orgAdmin,
        code: 200,
        message: 'success',
      })
    );
  }
);

const getOrganizationUserOrgAdmin = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/admin`,
  (req, res, ctx) => {
    const admin = db.organizationUserOrgInfo.findMany({});

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: admin,
      })
    );
  }
);

export const organizationUserOrgInfoHandlers = [
  getOrganizationUserOrgInfo,
  updateOrganizationUserOrgInfo,
  updateOrganizationUserOrgAdmin,
  getOrganizationUserOrgAdmin,
];
