import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';
import { uid } from '@/utils';

import { db } from '../../db';

const createDataMappingGroupHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/group`,
  async (req, res, ctx) => {
    const data = await req.json();

    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });

    const menuName = testData.dataMapping.group.meta.find(
      (item) => item.ObjectUUID === data.menuID
    )?.name;

    db.dataMappingGroup.create({
      ...data,
      groupID: uid(),
      created_dt: new Date().toISOString(),
      created_by: 'admin',
      updated_dt: new Date().toISOString(),
      updated_by: 'admin',
      organizationName:
        organization?.department_name ?? '',
      menuName,
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

const listDataMappingGroupHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/group`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.dataMappingGroup.findMany({
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
    });

    const totalRecord = db.dataMappingGroup.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: data,
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getDataMappingGroupHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/group/:groupId`,
  (req, res, ctx) => {
    const groupId = req.params.groupId as string;

    const data = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: groupId,
        },
      },
    });

    if (!data)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

const listDataMappingGroupMetaHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/meta/group`,
  (req, res, ctx) => {
    const data = db.dataMappingGroupMeta.findMany({});

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          menu: data,
        },
      })
    );
  }
);

const deleteDataMappingGroupHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/group/:groupId`,
  async (req, res, ctx) => {
    const groupId = req.params.groupId as string;

    const data = db.dataMappingGroup.delete({
      where: {
        groupID: {
          equals: groupId,
        },
      },
    });

    if (!data)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const updateDataMappingGroupHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/group/:groupId`,
  async (req, res, ctx) => {
    const groupId = req.params.groupId as string;

    const data = await req.json();
    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });

    const menuName = testData.dataMapping.group.meta.find(
      (item) => item.ObjectUUID === data.menuID
    )?.name;

    const updatedData = db.dataMappingGroup.update({
      where: {
        groupID: {
          equals: groupId,
        },
      },
      data: {
        ...data,
        menuName,
        organizationName: organization?.department_name,
      },
    });

    if (!updatedData)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

export const dataMappingGroupHandlers = [
  listDataMappingGroupHandler,
  deleteDataMappingGroupHandler,
  listDataMappingGroupMetaHandler,
  updateDataMappingGroupHandler,
  createDataMappingGroupHandler,
  getDataMappingGroupHandler,
];
