import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../../db';

import { channelHandlers } from './channel';
import { dataRetentionHandlers } from './data-retention';
import { purposeHandlers } from './purpose';

const getDataMappingActivityCollectHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect`,
  (req, res, ctx) => {
    const activity =
      db.dataMappingActivityCollect.getAll();

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

const updateDataMappingActivityCollectHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect`,
  async (req, res, ctx) => {
    const activity =
      db.dataMappingActivityCollect.getAll();

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

export const dataMappingActivityCollectHandlers = [
  getDataMappingActivityCollectHandler,
  updateDataMappingActivityCollectHandler,
  ...purposeHandlers,
  ...channelHandlers,
  ...dataRetentionHandlers,
];
