import _ from 'lodash';
import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

import { db } from '../../../../db';

const getDataMappingActivityCollectChannelHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/channel`,
    (req, res, ctx) => {
      const channel =
        db.dataMappingActivityCollectChannel.getAll();

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

const updateDataMappingActivityCollectChannelHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/channel/:channelId`,
    async (req, res, ctx) => {
      const channelId = req.params.channelId as string;
      const body = await req.json();
      const metaData =
        testData.dataMapping.activity.meta.sourceMethod;

      const findMetaData = _.find(
        metaData,
        (v) => v.ObjectUUID === body.sourceID
      );
      const channel =
        db.dataMappingActivityCollectChannel.findFirst({
          where: {
            assetID: {
              equals: channelId,
            },
          },
        });

      if (!channel) {
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

      const data =
        db.dataMappingActivityCollectChannel.update({
          where: {
            assetID: {
              equals: channelId,
            },
          },
          data: {
            ...channel,
            source: findMetaData?.name,
            sourceID: findMetaData?.ObjectUUID,
          },
        });

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

const deleteDataMappingActivityCollectChannelHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/channel/:channelId`,
    async (req, res, ctx) => {
      const channelId = req.params.channelId as string;

      const data =
        db.dataMappingActivityCollectChannel.delete({
          where: {
            assetID: {
              equals: channelId,
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

const addDataMappingActivityCollectChannelHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/channel`,
    async (req, res, ctx) => {
      const body = await req.json();
      const channelID = body?.channelID as string[];

      const data = channelID.map((assetId) => {
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
        db.dataMappingActivityCollectChannel.create({
          assetID: item?.assetID,
          name: item?.name,
          owner: item?.owner,
          group: item?.group,
          organization: item?.organization,
          country: item?.country,
          sourceID:
            'aec0bedd-2ad5-47d9-9ac2-7028538ca716',
          source: 'sourceMethod1',
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

export const channelHandlers = [
  getDataMappingActivityCollectChannelHandler,
  updateDataMappingActivityCollectChannelHandler,
  deleteDataMappingActivityCollectChannelHandler,
  addDataMappingActivityCollectChannelHandler,
];
