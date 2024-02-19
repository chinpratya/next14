import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../test-data';
import { db } from '../../db';

const listDataMappingDataLifecycleHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle`,
  (req, res, ctx) => {
    const search =
      req.url.searchParams.get('search') ?? '';
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const dataLifeCycles =
      db.dataMappingDataLifecycle.findMany({
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

    const currentRecord = dataLifeCycles.length;
    const totalRecord =
      db.dataMappingDataLifecycle.count();
    const currentPage = parseInt(page);
    const totalPage =
      db.dataMappingDataLifecycle.count() >
      parseInt(pageSize)
        ? Math.floor(
            db.dataMappingDataLifecycle.count() /
              parseInt(pageSize)
          )
        : 1;

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: dataLifeCycles,
        currentRecord,
        totalRecord,
        currentPage,
        totalPage,
      })
    );
  }
);

const getDataMappingDataLifecycleHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle/:dataLifeCycleId`,
  (req, res, ctx) => {
    const dataLifeCycleId = req.params
      .dataLifeCycleId as string;

    if (!dataLifeCycleId) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'data life cycle id is required',
        })
      );
    }

    const dataLifeCycle =
      db.dataMappingDataLifecycle.findFirst({
        where: {
          dataLifeCycleID: {
            equals: dataLifeCycleId,
          },
        },
      });

    if (!dataLifeCycle) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'data life cycle not found',
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: dataLifeCycle,
      })
    );
  }
);

const createDataMappingDataLifecycleHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle`,
  async (req, res, ctx) => {
    const body = await req.json();
    const activityId = body.activityId as string;
    if (!activityId) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'activity id is required',
        })
      );
    }

    const activity = db.dataMappingActivity.findFirst({
      where: {
        ObjectUUID: {
          equals: activityId,
        },
      },
    });

    if (!activity) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'activity not found',
        })
      );
    }

    const dataLifeCycle =
      db.dataMappingDataLifecycle.create({
        dataLifeCycleID: uuid(),
        activityID: activityId,
        name: activity.name,
        actorType: activity.activityType,
        group: activity.group,
        status: activity.status,
        owner: activity.owner,
        organization: activity.organization,
        created_by: 'frontend developer',
        created_dt: new Date().toISOString(),
      });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        ObjectUUID: dataLifeCycle.dataLifeCycleID,
      })
    );
  }
);

const deleteDataMappingDataLifecycleHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle/:dataLifeCycleId`,
  (req, res, ctx) => {
    const dataLifeCycleId = req.params
      .dataLifeCycleId as string;

    if (!dataLifeCycleId) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'data life cycle id is required',
        })
      );
    }

    db.dataMappingDataLifecycle.delete({
      where: {
        dataLifeCycleID: {
          equals: dataLifeCycleId,
        },
      },
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const getDataMappingDataLifecycleCycleHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle/:dataLifeCycleId/cycle`,
  (req, res, ctx) => {
    const dataLifeCycleId = req.params
      .dataLifeCycleId as string;

    if (!dataLifeCycleId) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'data life cycle id is required',
        })
      );
    }

    const dataLifeCycle =
      db.dataMappingDataLifecycle.findFirst({
        where: {
          dataLifeCycleID: {
            equals: dataLifeCycleId,
          },
        },
      });

    if (!dataLifeCycle) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'data life cycle not found',
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: testData.dataMapping.dataLifecycle.cycle
          .detail,
      })
    );
  }
);

const getDataMappingDataLifecycleCycleDataHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle/:dataLifeCycleId/cycle/data`,
    (req, res, ctx) => {
      const dataLifeCycleId = req.params
        .dataLifeCycleId as string;

      if (!dataLifeCycleId) {
        return res(
          ctx.delay(1000),
          ctx.status(400),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'data life cycle id is required',
          })
        );
      }

      const dataLifeCycle =
        db.dataMappingDataLifecycle.findFirst({
          where: {
            dataLifeCycleID: {
              equals: dataLifeCycleId,
            },
          },
        });

      if (!dataLifeCycle) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'data life cycle not found',
          })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: testData.dataMapping.dataLifecycle.cycle
            .data,
        })
      );
    }
  );

const getDataMappingDataLifecycleByActivityHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-life-cycle-activity/:activityId`,
    (req, res, ctx) => {
      const activityId = req.params.activityId as string;

      if (!activityId) {
        return res(
          ctx.delay(1000),
          ctx.status(400),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'activity id is required',
          })
        );
      }

      const dataLifeCycle =
        db.dataMappingDataLifecycle.findFirst({
          where: {
            activityID: {
              equals: activityId,
            },
          },
        });

      if (!dataLifeCycle) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'data life cycle not found',
          })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: dataLifeCycle,
        })
      );
    }
  );

export const dataMappingDataLifecycleHandlers = [
  listDataMappingDataLifecycleHandler,
  getDataMappingDataLifecycleHandler,
  createDataMappingDataLifecycleHandler,
  deleteDataMappingDataLifecycleHandler,
  getDataMappingDataLifecycleCycleHandler,
  getDataMappingDataLifecycleCycleDataHandler,
  getDataMappingDataLifecycleByActivityHandler,
];
