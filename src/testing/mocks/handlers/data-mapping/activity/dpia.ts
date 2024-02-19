import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const getDataMappingActivityDataDPIAHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/dpia`,
  (req, res, ctx) => {
    const activity = db.dataMappingActivityDPIA.getAll();

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
        data: activity[0],
      })
    );
  }
);

const updateDataMappingActivityDPIAHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/dpia`,
  async (req, res, ctx) => {
    const payload = await req.json();
    const data = db.dataMappingActivityDPIA.update({
      where: {
        ObjectUUID: {
          equals: 'aca7759b-9670-480f-8d38-a92025201af9',
        },
      },
      data: {
        ...payload,
        lastUpdatedDt: new Date().toISOString(),
      },
    });

    if (!data) {
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
        data,
      })
    );
  }
);
const getDataMappingActivityDataDPIAInitHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/dpia/init`,
    (req, res, ctx) => {
      const activity =
        db.dataMappingActivityDPIAInit.getAll();

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
          data: activity[0],
        })
      );
    }
  );

export const dataMappingActivityDPIAHandlers = [
  getDataMappingActivityDataDPIAHandler,
  updateDataMappingActivityDPIAHandler,
  getDataMappingActivityDataDPIAInitHandler,
];
