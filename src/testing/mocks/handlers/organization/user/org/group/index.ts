import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { uid } from '@/utils';

const listOrganizationUserOrgGroups = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group`,
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

    const userGroupWhere = search
      ? {
          name: {
            contains: search,
          },
          ignoreGroupId,
          ignoreUserId,
        }
      : {};

    const groups = db.organizationUserOrgGroup.findMany({
      where: userGroupWhere,
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord =
      db.organizationUserOrgGroupMember.count();
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
        data: groups,
        currentRecord: groups.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getOrganizationUserOrgGroup = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId`,
  (req, res, ctx) => {
    const groupId = req.params.groupId as string;

    const group = db.organizationUserOrgGroup.findFirst({
      where: {
        groupId: {
          equals: groupId,
        },
      },
    });

    if (!group) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find group!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: group,
        code: 200,
        message: 'success',
      })
    );
  }
);

const createOrganizationUserOrgGroup = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group`,
  async (req, res, ctx) => {
    const data = await req.json();

    const group = db.organizationUserOrgGroup.create({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: '-',
      groupId: uid(),
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: group,
      })
    );
  }
);

const updateOrganizationUserOrgGroup = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId`,
  async (req, res, ctx) => {
    const groupId = req.params.groupId as string;
    const data = await req.json();

    const group = db.organizationUserOrgGroup.update({
      where: {
        groupId: {
          equals: groupId,
        },
      },
      data: {
        ...data,
        updated_at: new Date().toISOString(),
      },
    });

    if (!group) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find group!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: group,
      })
    );
  }
);

const deleteOrganizationUserOrgGroup = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId`,
  (req, res, ctx) => {
    const groupId = req.params.groupId as string;

    const group = db.organizationUserOrgGroup.delete({
      where: {
        groupId: {
          equals: groupId,
        },
      },
    });

    if (!group) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find group!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
        data: group,
      })
    );
  }
);

export const organizationUserOrgGroupHandlers = [
  listOrganizationUserOrgGroups,
  getOrganizationUserOrgGroup,
  createOrganizationUserOrgGroup,
  updateOrganizationUserOrgGroup,
  deleteOrganizationUserOrgGroup,
];
