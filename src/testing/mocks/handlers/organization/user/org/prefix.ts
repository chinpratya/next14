import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint-test';
import { uid } from '@/utils';

import { db } from '../../../../db';

const getOrganizationUserOrgPrefixes = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/prefix`,
  (req, res, ctx) => {
    const prefixes =
      db.organizationUserOrgPrefix.findMany({});

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: prefixes,
      })
    );
  }
);

const getOrganizationUserOrgPrefix = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/prefix/:prefixId`,
  (req, res, ctx) => {
    const prefixId = req.params.prefixId as string;

    const prefix = db.organizationUserOrgPrefix.findFirst(
      {
        where: {
          prefix_id: {
            equals: prefixId,
          },
        },
      }
    );

    if (!prefix) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find prefix!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: prefix,
        code: 200,
        message: 'success',
      })
    );
  }
);

const createOrganizationOrgUserPrefix = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/prefix`,
  async (req, res, ctx) => {
    const data = await req.json();

    const prefix = {
      ...data,
      prefix_id: uid(),
    };

    db.organizationUserOrgPrefix.create(prefix);

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: prefix,
      })
    );
  }
);

export const updateOrganizationOrgUserPrefix = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/prefix/:prefixId`,
  async (req, res, ctx) => {
    const prefixId = req.params.prefixId as string;
    const data = await req.json();

    const updatedPrefix =
      db.organizationUserOrgPrefix.update({
        where: {
          prefix_id: {
            equals: prefixId,
          },
        },
        data: {
          ...data,
          prefix_id: prefixId,
        },
      });

    if (!updatedPrefix) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find prefix!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: updatedPrefix,
        code: 200,
        message: 'success',
      })
    );
  }
);

export const deleteOrganizationOrgUserPrefix =
  rest.delete(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/prefix/:prefixId`,
    (req, res, ctx) => {
      const prefixId = req.params.prefixId as string;

      const deletedPrefix =
        db.organizationUserOrgPrefix.delete({
          where: {
            prefix_id: {
              equals: prefixId,
            },
          },
        });

      if (!deletedPrefix) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Can`t find prefix!' })
        );
      }

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
export const organizationUserOrgPrefixHandlers = [
  getOrganizationUserOrgPrefixes,
  getOrganizationUserOrgPrefix,
  createOrganizationOrgUserPrefix,
  updateOrganizationOrgUserPrefix,
  deleteOrganizationOrgUserPrefix,
];
