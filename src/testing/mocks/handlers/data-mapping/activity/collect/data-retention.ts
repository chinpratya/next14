import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../../db';

const getDataMappingActivityCollectDataRetentionHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/data-retention`,
    (req, res, ctx) => {
      const channel =
        db.dataMappingActivityCollectDataRetention.getAll();

      if (!channel) {
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
          data: channel,
        })
      );
    }
  );

const deleteDataMappingActivityCollectDataRetentionHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/data-retention/:dataRetentionId`,
    async (req, res, ctx) => {
      const dataRetentionId = req.params
        .dataRetentionId as string;

      const data =
        db.dataMappingActivityCollectDataRetention.delete(
          {
            where: {
              assetID: {
                equals: dataRetentionId,
              },
            },
          }
        );

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

const addDataMappingActivityCollectDataRetentionHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/data-retention`,
    async (req, res, ctx) => {
      const body = await req.json();
      const dataRetentionID =
        body?.dataRetentionID as string[];

      const data = dataRetentionID.map((assetId) => {
        return db.dataMappingAsset.findFirst({
          where: {
            assetID: {
              equals: assetId,
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
        db.dataMappingActivityCollectDataRetention.create(
          {
            assetID: item?.assetID,
            name: item?.name,
            owner: item?.owner,
            group: item?.group,
            organization: item?.organization,
            country: item?.country,
            sourceID:
              'aec0bedd-2ad5-47d9-9ac2-7028538ca716',
            source: 'sourceMethod1',
          }
        );
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

export const dataRetentionHandlers = [
  getDataMappingActivityCollectDataRetentionHandler,
  deleteDataMappingActivityCollectDataRetentionHandler,
  addDataMappingActivityCollectDataRetentionHandler,
];
