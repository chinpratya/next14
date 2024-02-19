import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const listDataMappingActivityActorHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/actor/:actorType`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const actorType = req.params.actorType as string;
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = db.dataMappingActivityActor.findMany({
      where: {
        activityId: {
          equals: activityId,
        },
        actorType: {
          equals: actorType,
        },
      },
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
    });

    const currentRecord = data.length;
    const totalRecord = db.dataMappingActivityActor.count(
      {
        where: {
          activityId: {
            equals: activityId,
          },
          actorType: {
            equals: actorType,
          },
        },
      }
    );
    const currentPage = parseInt(page);
    const totalPage = Math.ceil(
      totalRecord / parseInt(pageSize)
    );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: data?.map((item) => ({
          ...item,
          id: undefined,
          activityId: undefined,
          actorType: undefined,
        })),
        totalRecord,
        totalPage,
        currentPage,
        currentRecord,
      })
    );
  }
);

const addDataMappingActivityActorHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/actor/:actorType`,
  async (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const actorType = req.params.actorType as string;
    const body = await req.json();
    const actorIds = body?.actorId as string[];

    const data = actorIds.map((actorId) => {
      return db.dataMappingDataProcessor.findFirst({
        where: {
          dataProcessorID: {
            equals: actorId,
          },
        },
      });
    });

    if (data.find((item) => !item)) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'error',
        })
      );
    }

    data.forEach((item) => {
      db.dataMappingActivityActor.create({
        id: uuid(),
        activityId: activityId,
        actorType: actorType,
        ObjectUUID: item?.dataProcessorID,
        name: item?.name,
        email: item?.email,
        phoneNumber: item?.tel,
        type: item?.position,
        organization: item?.organizationName,
        organizationType: item?.organizationType,
        created_by: 'fakhrullah',
        created_dt: new Date().toISOString(),
      });
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

const removeDataMappingActivityActorHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/actor/:actorType/:actorId`,
  async (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const actorType = req.params.actorType as string;
    const actorId = req.params.actorId as string;

    db.dataMappingActivityActor.delete({
      where: {
        activityId: {
          equals: activityId,
        },
        actorType: {
          equals: actorType,
        },
        ObjectUUID: {
          equals: actorId,
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

export const dataMappingActivityActorHandlers = [
  listDataMappingActivityActorHandler,
  addDataMappingActivityActorHandler,
  removeDataMappingActivityActorHandler,
];
