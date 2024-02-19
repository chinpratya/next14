import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const listDataMappingActivityPurposeHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/purpose`,
  (req, res, ctx) => {
    const activity =
      db.dataMappingActivityUseAndPublishPurpose.getAll();

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
        data: activity,
      })
    );
  }
);

export const dataMappingActivityPurposeHandlers = [
  listDataMappingActivityPurposeHandler,
];
