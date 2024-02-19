import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { uid } from '@/utils';

import { db } from '../../../../db';

const getOrganizationUserOrgPositions = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/position`,
  (req, res, ctx) => {
    const positions =
      db.organizationUserOrgPosition.findMany({});

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: positions,
      })
    );
  }
);

const getOrganizationUserOrgPosition = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/position/:positionId`,
  (req, res, ctx) => {
    const positionId = req.params.positionId as string;

    const position =
      db.organizationUserOrgPosition.findFirst({
        where: {
          positionId: {
            equals: positionId,
          },
        },
      });

    if (!position) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find position!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: position,
        code: 200,
        message: 'success',
      })
    );
  }
);

const createOrganizationUserOrgPosition = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/position`,
  async (req, res, ctx) => {
    const data = await req.json();

    const position =
      db.organizationUserOrgPosition.create({
        ...data,
        positionId: uid(),
      });

    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({
        data: position,
        code: 201,
        message: 'success',
      })
    );
  }
);

const updateOrganizationUserOrgPosition = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/position/:positionId`,
  async (req, res, ctx) => {
    const positionId = req.params.positionId as string;
    const data = await req.json();

    const position =
      db.organizationUserOrgPosition.update({
        where: {
          positionId: {
            equals: positionId,
          },
        },
        data,
      });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: position,
        code: 200,
        message: 'success',
      })
    );
  }
);

const deleteOrganizationUserOrgPosition = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/position/:positionId`,
  (req, res, ctx) => {
    const positionId = req.params.positionId as string;

    db.organizationUserOrgPosition.delete({
      where: {
        positionId: {
          equals: positionId,
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
export const organizationUserOrgPositionHandlers = [
  getOrganizationUserOrgPositions,
  getOrganizationUserOrgPosition,
  createOrganizationUserOrgPosition,
  updateOrganizationUserOrgPosition,
  deleteOrganizationUserOrgPosition,
];
