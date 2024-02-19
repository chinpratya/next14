import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';

import { db } from '../../../../db';

const createOrganizationUserOrgRole = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.organizationUserOrgRole.create({
      ...data,
      description: data.description || '-',
      created_dt: new Date().toISOString(),
      created_by: 'frontend developer',
      updated_dt: '',
      updated_by: '',
      roleId: uid(),
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

const listOrganizationUserOrgRole = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get('name') || '';
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';
    const ignoreGroupId =
      req.url.searchParams.get('ignore_groupId') ||
      undefined;
    const ignoreUserId =
      req.url.searchParams.get('ignore_userId') ||
      undefined;

    const roleWhere = search
      ? {
          name: {
            contains: search,
          },
          ignoreGroupId,
          ignoreUserId,
        }
      : {};

    const roles = db.organizationUserOrgRole.findMany({
      where: roleWhere,
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord =
      db.organizationUserOrgRole.count();

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
        data: roles.map((role) => ({
          ...role,
          permissionsId: undefined,
        })),
        currentRecord: roles.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getOrganizationUserOrgRole = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role/:roleId`,
  (req, res, ctx) => {
    const roleId = req.params.roleId as string;

    const role = db.organizationUserOrgRole.findFirst({
      where: {
        roleId: {
          equals: roleId,
        },
      },
    });

    if (!role) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find role!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: {
          ...role,
          permissionsId: undefined,
        },
        code: 200,
        message: 'success',
      })
    );
  }
);

const updateOrganizationUserOrgRole = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role/:roleId`,
  async (req, res, ctx) => {
    const roleId = req.params.roleId as string;
    const data = await req.json();

    const role = db.organizationUserOrgRole.update({
      where: {
        roleId: {
          equals: roleId,
        },
      },
      data: {
        ...data,
        description: data.description || '-',
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
      },
    });

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

const deleteOrganizationUserOrgRole = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role/:roleId`,
  (req, res, ctx) => {
    const roleId = req.params.roleId as string;

    db.organizationUserOrgRole.delete({
      where: {
        roleId: {
          equals: roleId,
        },
      },
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

const getOrganizationUserOrgRolePermissions = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role/:roleId/permission`,
  (req, res, ctx) => {
    const roleId = req.params.roleId as string;

    const role = db.organizationUserOrgRole.findFirst({
      where: {
        roleId: {
          equals: roleId,
        },
      },
    });

    if (!role) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find role!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: {
          permissionId: role.permissionsId,
        },
        code: 200,
        message: 'success',
      })
    );
  }
);

export const updateOrganizationUserOrgRolePermissions =
  rest.post(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/role/:roleId/permission`,
    async (req, res, ctx) => {
      const roleId = req.params.roleId as string;
      const data = await req.json();

      if (!data.permissionId) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Can`t find permissions!' })
        );
      }

      const role = db.organizationUserOrgRole.update({
        where: {
          roleId: {
            equals: roleId,
          },
        },
        data: {
          permissionsId: data.permissionId,
          updated_dt: new Date().toISOString(),
          updated_by: 'frontend developer',
        },
      });

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

export const organizationUserOrgRoleHandlers = [
  createOrganizationUserOrgRole,
  listOrganizationUserOrgRole,
  getOrganizationUserOrgRole,
  updateOrganizationUserOrgRole,
  deleteOrganizationUserOrgRole,
  getOrganizationUserOrgRolePermissions,
  updateOrganizationUserOrgRolePermissions,
];
