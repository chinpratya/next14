import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

import { db } from '../../../db';

import { dataMappingActivityActorHandlers } from './actor';
import { dataMappingActivityBasisHandlers } from './basis';
import { dataMappingActivityCollectHandlers } from './collect';
import { dataMappingActivityDataCategoryHandlers } from './data-category';
import { dataMappingActivityDisclosureHandlers } from './disclosure';
import { dataMappingActivityDPIAHandlers } from './dpia';
import { dataMappingActivityLawfulBasisHandlers } from './lawful-basis';
import { dataMappingActivityPreviewHandlers } from './preview';
import { dataMappingActivityPurposeHandlers } from './purpose';
import { dataMappingActivityUsageHandlers } from './usage';

const listDataMappingActivityHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = db.dataMappingActivity.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
    });

    const totalRecord = db.dataMappingActivity.count();
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
        data: data.map((item) => ({
          ...item,
          groupID: undefined,
          organizationID: undefined,
          ownerID: undefined,
          isDisclosure: undefined,
        })),
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getDataMappingActivityHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    const activity = db.dataMappingActivity.findFirst({
      where: {
        ObjectUUID: {
          equals: activityId,
        },
      },
    });

    if (!activity) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'not found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          ...activity,
          isDisclosure: undefined,
        },
      })
    );
  }
);

const createDataMappingActivityHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity`,
  async (req, res, ctx) => {
    const body = await req.json();

    const organization =
      await db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: body.organizationID as string,
          },
        },
      });

    const owner =
      await db.organizationUserOrgUsers.findFirst({
        where: {
          userId: {
            equals: body.ownerID as string,
          },
        },
      });

    const group = await db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: body.groupID as string,
        },
      },
    });

    const activity = db.dataMappingActivity.create({
      ...body,
      status: 'inactive',
      organization: organization?.department_name,
      owner: owner?.first_name + ' ' + owner?.last_name,
      group: group?.name,
      created_at: new Date().toISOString(),
      created_by: 'frontend developer',
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        ObjectUUID: activity.ObjectUUID,
      })
    );
  }
);

const updateDataMappingActivityHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId`,
  async (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const body = await req.json();

    const activity =
      await db.dataMappingActivity.findFirst({
        where: {
          ObjectUUID: {
            equals: activityId,
          },
        },
      });

    if (!activity) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'not found',
        })
      );
    }

    const organization =
      await db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: body.organizationID as string,
          },
        },
      });

    const owner =
      await db.organizationUserOrgUsers.findFirst({
        where: {
          userId: {
            equals: body.ownerID as string,
          },
        },
      });

    const group = await db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: body.groupID as string,
        },
      },
    });

    db.dataMappingActivity.update({
      where: {
        ObjectUUID: {
          equals: activityId,
        },
      },
      data: {
        ...body,
        organization: organization?.department_name,
        owner: owner?.first_name + ' ' + owner?.last_name,
        group: group?.name,
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const deleteDataMappingActivityHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    db.dataMappingActivity.delete({
      where: {
        ObjectUUID: {
          equals: activityId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const publishDataMappingActivityHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/publish`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    db.dataMappingActivity.update({
      where: {
        ObjectUUID: {
          equals: activityId,
        },
      },
      data: {
        status: 'active',
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const getDataMappingActivityMetaHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/meta/activity`,
  (req, res, ctx) => {
    const data = testData.dataMapping.activity.meta;
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

export const dataMappingActivityHandlers = [
  ...dataMappingActivityActorHandlers,
  ...dataMappingActivityBasisHandlers,
  ...dataMappingActivityLawfulBasisHandlers,
  ...dataMappingActivityCollectHandlers,
  ...dataMappingActivityDataCategoryHandlers,
  ...dataMappingActivityDisclosureHandlers,
  ...dataMappingActivityPreviewHandlers,
  ...dataMappingActivityPurposeHandlers,
  ...dataMappingActivityDPIAHandlers,
  ...dataMappingActivityUsageHandlers,
  listDataMappingActivityHandler,
  getDataMappingActivityHandler,
  createDataMappingActivityHandler,
  updateDataMappingActivityHandler,
  deleteDataMappingActivityHandler,
  publishDataMappingActivityHandler,
  getDataMappingActivityMetaHandler,
];
