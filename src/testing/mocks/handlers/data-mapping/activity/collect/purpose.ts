import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../../db';

const getDataMappingActivityCollectPurposeHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/purpose`,
    (req, res, ctx) => {
      const purpose =
        db.dataMappingActivityCollectPurpose.getAll();

      if (!purpose) {
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
          data: purpose,
        })
      );
    }
  );

const deleteDataMappingActivityCollectPurposeHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/purpose/:purposeId`,
    async (req, res, ctx) => {
      const purposeId = req.params.purposeId as string;

      const data =
        db.dataMappingActivityCollectPurpose.delete({
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

const addDataMappingActivityCollectPurposeHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/collect/purpose`,
    async (req, res, ctx) => {
      const body = await req.json();
      const purposeID = body?.purposeID as string[];

      const data = purposeID.map((purposeId) => {
        return db.dataMappingPurpose.findFirst({
          where: {
            purposeID: {
              equals: purposeId,
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
        db.dataMappingActivityCollectPurpose.create({
          purposeID: item?.purposeID,
          name: item?.name,
          legalBasis: `${item?.legalBasis ?? ''}`,
          group: item?.group,
          organization: item?.organization,
          isDataUsagePeriod: true,
          dataUsagePeriod: {
            day: '1',
            month: '2',
            year: '3',
            description:
              'This is the year of the category',
          },
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

export const purposeHandlers = [
  getDataMappingActivityCollectPurposeHandler,
  deleteDataMappingActivityCollectPurposeHandler,
  addDataMappingActivityCollectPurposeHandler,
];
