import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';

import { db } from '../../../../db';

import { testData } from './../../../../../test-data/index';

const getListUserHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get(
      'search'
    ) as string;
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';
    // const ignoreGroupId =
    //   req.url.searchParams.get('ignore_groupId') ||
    //   undefined;
    // const ignoreDepartmentId =
    //   req.url.searchParams.get('ignore_departmentId') ||
    //   undefined;

    const user = db.organizationUserOrgUsers.findMany({
      where: {
        first_name: {
          contains: search ?? '',
        },
        last_name: {
          contains: search ?? '',
        },
        userId: {
          contains: search ?? '',
        },
      },
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord =
      db.organizationUserOrgUsers.count();
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

const createUserHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.organizationUserOrgUsers.create({
      ...data,
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

const getUserByIdHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId`,
  async (req, res, ctx) => {
    const userId = req.params.userId as string;

    const user = db.organizationUserOrgUsers.findFirst({
      where: {
        userId: {
          equals: userId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          ...user,
          profile_pic: faker.image.avatar(),
          departmentId: uuid(),
          prefix: '',
          jobId: uuid(),
          access_start_date: faker.date.birthdate(),
          access_end_date: '',
        },
      })
    );
  }
);

export const updateOrganizationUser = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId`,
  async (req, res, ctx) => {
    const userId = req.params.userId as string;
    const data = await req.json();
    const userInfo =
      db.organizationUserOrgUserUserInfo.create(
        data.user_info
      );
    const workInfo =
      db.organizationUserOrgUserWorkInfo.create(
        data.work_info
      );
    const addressInfo =
      db.organizationUserOrgUserAddress.create(
        data.address
      );
    const updatedUser =
      db.organizationUserOrgUsers.update({
        where: {
          userId: {
            equals: userId,
          },
        },
        data: {
          ...data,
          work_info: workInfo,
          user_info: userInfo,
          address: addressInfo,
        },
      });

    if (!updatedUser) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find user!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: updatedUser,
        code: 200,
        message: 'success',
      })
    );
  }
);

export const deleteOrganizationUser = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId`,
  (req, res, ctx) => {
    const userId = req.params.userId as string;

    const deletedUser =
      db.organizationUserOrgUsers.delete({
        where: {
          userId: {
            equals: userId,
          },
        },
      });

    if (!deletedUser) {
      return res(
        ctx.delay(1500),
        ctx.status(404),
        ctx.json({ message: 'Can`t find User!' })
      );
    }

    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const getListUserDepartmentHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/department`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get(
      'search'
    ) as string;
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const department =
      db.organizationUserOrgUserDepartMent.findMany({
        where: {
          department_name: {
            contains: search,
          },
        },
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
      });

    const totalRecord =
      db.organizationUserOrgUserDepartMent.count();
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
        data: department,
        currentRecord: department.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const deleteDepartmentUserHandler = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/department/:departmentId`,
  (req, res, ctx) => {
    const departmentId = req.params
      .departmentId as string;

    const data =
      db.organizationUserOrgUserDepartMent.delete({
        where: {
          departmentId: {
            equals: departmentId,
          },
        },
      });
    console.log('data', data);

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

const addDepartmentUserHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/department`,
  async (req, res, ctx) => {
    const payload = await req.json();

    const department =
      testData.organization.user.org.users
        .listAllDepartMent;
    _.map(payload?.departmentId, (v) => {
      const data = _.find(
        department,
        (d) => d.departmentId === v
      );
      console.log('name', name);

      db.organizationUserOrgUserDepartMent.create({
        departmentId: v,
        department_name: data
          ? (data.department_name as string)
          : '',
        department_name_en: data
          ? (data.department_name_en as string)
          : '',
        department_type: data ? data.department_type : '',
        department_abbreviation: 'nc',
        department_head: 'test',
        under_department: 'test_under_department',
        level_label: data ? data.level_label : '',
        level: data ? data.level : '',
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

const getListUserRoleHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/role`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get(
      'search'
    ) as string;
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const role = db.organizationUserOrgUserRole.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
    });

    const totalRecord =
      db.organizationUserOrgUserRole.count();
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

const addRoleUserHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/role`,
  async (req, res, ctx) => {
    const payload = await req.json();
    const data = db.organizationUserOrgRole.findMany({});

    const result = _.filter(data, (item) =>
      _.includes(payload.roleId, item.roleId)
    );

    _.map(result, (role) =>
      db.organizationUserOrgUserRole.create(role)
    );

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

const resetPasswordUserHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/reset-password`,
  async (req, res, ctx) => {
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

export const deleteOrganizationRoleUser = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/role/:roleId`,
  (req, res, ctx) => {
    const roleId = req.params.roleId as string;

    const deletedRole =
      db.organizationUserOrgUserRole.delete({
        where: {
          roleId: {
            equals: roleId,
          },
        },
      });

    if (!deletedRole) {
      return res(
        ctx.delay(1500),
        ctx.status(404),
        ctx.json({ message: 'Can`t find User!' })
      );
    }

    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const addGroupUserHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/group`,
  async (req, res, ctx) => {
    const payload = await req.json();
    const data = db.organizationUserOrgGroup.findMany({});

    const result = _.filter(data, (item) =>
      _.includes(payload.groupId, item.groupId)
    );

    _.map(result, (group) =>
      db.organizationUserOrgUserGroup.create({
        ...group,
        created_by: 'janstorn',
        description: 'etc.',
        created_dt: '2023-04-05T02:49:34.401Z',
      })
    );

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

const getListUserGroupHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/group`,
  (req, res, ctx) => {
    const search = req.url.searchParams.get(
      'search'
    ) as string;
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const user = db.organizationUserOrgUserGroup.findMany(
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
      db.organizationUserOrgUserGroup.count();
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

export const deleteOrganizationGroupUser = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/user/:userId/group/:groupId`,
  (req, res, ctx) => {
    const groupId = req.params.groupId as string;

    const deletedRole =
      db.organizationUserOrgUserGroup.delete({
        where: {
          groupId: {
            equals: groupId,
          },
        },
      });

    if (!deletedRole) {
      return res(
        ctx.delay(1500),
        ctx.status(404),
        ctx.json({ message: 'Can`t find User!' })
      );
    }

    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

export const OrganizationUserHandlers = [
  getListUserHandler,
  createUserHandler,
  getUserByIdHandler,
  updateOrganizationUser,
  deleteOrganizationUser,
  getListUserRoleHandler,
  addRoleUserHandler,
  deleteOrganizationRoleUser,
  getListUserGroupHandler,
  addGroupUserHandler,
  deleteOrganizationGroupUser,
  getListUserDepartmentHandler,
  addDepartmentUserHandler,
  deleteDepartmentUserHandler,
  resetPasswordUserHandler,
];
