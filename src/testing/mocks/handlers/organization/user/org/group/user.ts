import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { uid } from '@/utils';

export const listOrganizationUserOrgGroupUserHandler =
  rest.get(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId/user`,
    (req, res, ctx) => {
      const search =
        req.url.searchParams.get('first_name') || '';
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const user =
        db.organizationUserOrgGroupMember.findMany({
          where: {
            first_name: {
              contains: search,
            },
          },
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          orderBy: {
            created_dt: 'desc',
          },
        });

      if (!user) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Can`t find group!',
          })
        );
      }

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
          data: user,
          currentRecord: user.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

export const createOrganizationUserOrgGroupUserHandler =
  rest.post(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId/user`,
    async (req, res, ctx) => {
      const groupId = req.params.groupId as string;
      const {
        userId: userId,
      }: {
        userId: string[];
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

      const users = userId?.map((userId) =>
        db.organizationUserOrgUsers.findFirst({
          where: {
            userId: {
              equals: userId,
            },
          },
        })
      );

      if (!users) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Can`t find user!',
          })
        );
      }

      users?.forEach((user) => {
        if (!user) return null;
        db.organizationUserOrgGroupMember.create({
          ...user,
          userId: uid(),
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

export const deleteOrganizationUserOrgGroupUserHandler =
  rest.delete(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/group/:groupId/user/:userId`,
    (req, res, ctx) => {
      const userId = req.params.userId as string;

      const user =
        db.organizationUserOrgGroupMember.delete({
          where: {
            userId: {
              equals: userId,
            },
          },
        });

      if (!user) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Can`t find user!',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: user,
        })
      );
    }
  );

export const organizationUserOrgGroupUserHandlers = [
  listOrganizationUserOrgGroupUserHandler,
  createOrganizationUserOrgGroupUserHandler,
  deleteOrganizationUserOrgGroupUserHandler,
];
