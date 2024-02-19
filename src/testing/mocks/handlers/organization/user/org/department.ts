import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { uid } from '@/utils';

import { db } from '../../../../db';

const listOrganizationUserOrgDepartment = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department`,
  (req, res, ctx) => {
    const defaultQuery = req.url.searchParams.get(
      'default'
    ) as string;

    const isExpand = defaultQuery === 'expand';

    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const departments =
      db.organizationUserOrgDepartment.findMany({
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: {
          created_dt: 'desc',
        },
      });

    const processDepartments = (parentId?: string) => {
      const deps = departments.filter(
        (dep) =>
          dep.under_department === parentId ||
          (!parentId && !dep.under_department)
      );
      return deps.map((dep) => {
        const sub_department = processDepartments(
          dep.departmentId
        ) as any;
        return {
          ...dep,
          sub_department: sub_department,
        };
      });
    };

    const processedDepartment = isExpand
      ? {
          ...departments[0],
          sub_department: [...departments.slice(1)],
        }
      : processDepartments();

    const currentRecord = departments.length;
    const totalRecord =
      db.organizationUserOrgDepartment.count();
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
        data: processedDepartment,
        currentRecord,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getOrganizationUserOrgDepartment = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department/:departmentId`,
  (req, res, ctx) => {
    const departmentId = req.params
      .departmentId as string;

    const department =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: departmentId,
          },
        },
      });

    if (!department) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find department!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: department,
        code: 200,
        message: 'success',
      })
    );
  }
);

const createOrganizationUserOrgDepartment = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department`,
  async (req, res, ctx) => {
    const data = await req.json();

    const parentDepartment =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.under_department,
          },
        },
      });

    if (!parentDepartment) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          message: 'Can`t find under department!',
        })
      );
    }

    const departmentLevel =
      parseInt(parentDepartment?.level) + 1;

    const department =
      db.organizationUserOrgDepartment.create({
        ...data,
        departmentId: uid(),
        department_head:
          parentDepartment?.department_name,
        level: departmentLevel.toString(),
        level_label: `Level ${departmentLevel}`,
        created_dt: new Date().toISOString(),
        created_by: 'frontend developer',
      });

    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({
        data: department,
        code: 201,
        message: 'success',
      })
    );
  }
);

const updateOrganizationUserOrgDepartment = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department/:departmentId`,
  async (req, res, ctx) => {
    const departmentId = req.params
      .departmentId as string;
    const data = await req.json();

    db.organizationUserOrgDepartment.update({
      where: {
        departmentId: {
          equals: departmentId,
        },
      },
      data: {
        ...data,
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
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

const deleteOrganizationUserOrgDepartment = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department/:departmentId`,
  (req, res, ctx) => {
    const departmentId = req.params
      .departmentId as string;

    db.organizationUserOrgDepartment.delete({
      where: {
        departmentId: {
          equals: departmentId,
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

const listOrganizationUserOrgDepartmentUserHandler =
  rest.get(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department/:departmentId/user`,
    (req, res, ctx) => {
      const departmentId = req.params
        .departmentId as string;

      const department =
        db.organizationUserOrgDepartment.findFirst({
          where: {
            departmentId: {
              equals: departmentId,
            },
          },
        });

      if (!department) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            message: 'Can`t find department!',
          })
        );
      }

      const users =
        db.organizationUserOrgDepartmentUser.findMany({
          where: {
            departmentId: {
              equals: departmentId,
            },
          },
        });

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data: users.map((user) => ({
            ...user,
            id: undefined,
            departmentId: undefined,
          })),
        })
      );
    }
  );

const createOrganizationUserOrgDepartmentUserHandler =
  rest.post(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department/:departmentId/user`,
    async (req, res, ctx) => {
      const departmentId = req.params
        .departmentId as string;
      const {
        userId: userIds,
      }: {
        userId: string[];
      } = await req.json();

      const department =
        db.organizationUserOrgDepartment.findFirst({
          where: {
            departmentId: {
              equals: departmentId,
            },
          },
        });

      if (!department) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            message: 'Can`t find department!',
          })
        );
      }

      const users = userIds?.map((userId) =>
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
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            message: 'Can`t find user!',
          })
        );
      }

      users?.forEach((user) => {
        if (!user) return null;
        db.organizationUserOrgDepartmentUser.create({
          ...user,
          id: uid(),
          departmentId,
        });
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

const deleteOrganizationUserOrgDepartmentUserHandler =
  rest.delete(
    `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/department/:departmentId/user/:userId`,
    async (req, res, ctx) => {
      const departmentId = req.params
        .departmentId as string;
      const userId = req.params.userId as string;

      const user =
        db.organizationUserOrgDepartmentUser.findFirst({
          where: {
            userId: {
              equals: userId,
            },
          },
        });

      if (!user) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            message: 'Can`t find user!',
          })
        );
      }

      db.organizationUserOrgDepartmentUser.delete({
        where: {
          departmentId: {
            equals: departmentId,
          },
          userId: {
            equals: userId,
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

export const organizationUserOrgDepartmentHandlers = [
  listOrganizationUserOrgDepartment,
  getOrganizationUserOrgDepartment,
  createOrganizationUserOrgDepartment,
  updateOrganizationUserOrgDepartment,
  deleteOrganizationUserOrgDepartment,
  listOrganizationUserOrgDepartmentUserHandler,
  createOrganizationUserOrgDepartmentUserHandler,
  deleteOrganizationUserOrgDepartmentUserHandler,
];
