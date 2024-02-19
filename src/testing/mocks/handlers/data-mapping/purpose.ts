import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../test-data';
import { db } from '../../db';

const listDataMappingPurposeHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/purpose`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const data = db.dataMappingPurpose.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      // orderBy: {
      //   created_dt: 'desc',
      // },
    });

    const totalRecord = db.dataMappingPurpose.count();
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

const getPurposeDetailHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/purpose/:purposeId`,
  async (req, res, ctx) => {
    const purposeId = req.params.purposeId as string;

    const data = db.dataMappingPurpose.findFirst({
      where: {
        purposeID: {
          equals: purposeId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data,
      })
    );
  }
);

const createPurposeHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/purpose`,
  async (req, res, ctx) => {
    const payload = await req.json();
    const dataAll = testData.dataMapping.purpose.list;
    const group = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: payload.groupID,
        },
      },
    });
    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: payload.organizationID,
          },
        },
      });
    const id = uuid() as string;
    const data = {
      ...dataAll[0],
      name: payload.name,
      group: group?.name ?? '',
      groupID: group?.groupID ?? '',
      purposeID: id,
      organization: organization?.department_name ?? '',
      organizationID: organization?.departmentId ?? '',
      version: 1,
    };

    db.dataMappingPurpose.create(data);

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        purposeID: id,
      })
    );
  }
);

const updatePurposeHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/purpose/:purposeId`,
  async (req, res, ctx) => {
    const purposeId = req.params.purposeId as string;
    const data = await req.json();

    const purpose = db.dataMappingPurpose.findFirst({
      where: {
        purposeID: {
          equals: purposeId,
        },
      },
    });
    const group = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: data.groupID,
        },
      },
    });
    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });

    db.dataMappingPurpose.update({
      where: {
        purposeID: {
          equals: purposeId,
        },
      },
      data: {
        ...data,
        group: group?.name ?? '',
        groupID: group?.groupID ?? '',
        organization: organization?.department_name ?? '',
        organizationID: organization?.departmentId ?? '',
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
        version: purpose ? 1 : 2,
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

const listDataMappingPurposeHistoryHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/purpose/:purposeId/history`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const data = db.dataMappingPurposeHistory.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      // orderBy: {
      //   created_dt: 'desc',
      // },
    });

    const totalRecord =
      db.dataMappingPurposeHistory.count();
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

const deleteDataMappingPurposeHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/purpose/:purposeId`,
  async (req, res, ctx) => {
    const purposeId = req.params.purposeId as string;

    const data = db.dataMappingPurpose.delete({
      where: {
        purposeID: {
          equals: purposeId,
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

export const dataMappingPurposeHandlers = [
  listDataMappingPurposeHandler,
  getPurposeDetailHandler,
  createPurposeHandler,
  updatePurposeHandler,
  listDataMappingPurposeHistoryHandler,
  deleteDataMappingPurposeHandler,
];
