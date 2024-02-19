import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { uid } from '@/utils';

const listOrganizationUserOrgGroupRoles = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId/role`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get('name') || '';
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const role = db.organizationUserOrgGroupRole.findMany(
      {
        where: {
          name: {
            contains: search,
          },
        },
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: {
          created_dt: 'desc',
        },
      }
    );

    const totalRecord =
      db.organizationUserOrgGroupRole.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: role,
        currentRecord: role.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

export const createOrganizationUserOrgGroupRole =
  rest.post(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId/role`,
    async (req, res, ctx) => {
      const groupId = req.params.groupId as string;
      const {
        roleId: roleId,
      }: {
        roleId: string[];
      } = await req.json();

      const group = db.organizationUserOrgGroup.findFirst(
        {
          where: {
            groupId: {
              equals: groupId,
            },
          },
        }
      );

      if (!group) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Can`t find group!',
          })
        );
      }

      const roles = roleId?.map((roleId) =>
        db.organizationUserOrgRole.findFirst({
          where: {
            roleId: {
              equals: roleId,
            },
          },
        })
      );

      if (!roles) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Can`t find role!',
          })
        );
      }

      roles?.forEach((role) => {
        if (!role) return null;
        db.organizationUserOrgGroupRole.create({
          ...role,
          roleId: uid(),
        });
      });

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

export const deleteOrganizationUserOrgGroupRole =
  rest.delete(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId/role/:roleId`,
    async (req, res, ctx) => {
      const roleId = req.params.roleId as string;

      const role = db.organizationUserOrgGroupRole.delete(
        {
          where: {
            roleId: {
              equals: roleId,
            },
          },
        }
      );

      if (!role) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            message: 'Can`t find role!',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: role,
        })
      );
    }
  );

export const organizationUserOrgGroupRoleHandlers = [
  listOrganizationUserOrgGroupRoles,
  createOrganizationUserOrgGroupRole,
  deleteOrganizationUserOrgGroupRole,
];
