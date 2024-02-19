import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';
import { db } from '../../../db';

const listDataMappingActivityDataCategoryHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/data-category`,
    (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        db.dataMappingActivityDataCategory.findMany({
          where: {
            activityID: {
              equals: activityId,
            },
          },
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
        });

      const currentRecord = data.length;
      const totalRecord =
        db.dataMappingActivityDataCategory.count({
          where: {
            activityID: {
              equals: activityId,
            },
          },
        });
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
            dataCategoryId: undefined,
          })),
          currentRecord,
          totalRecord,
          currentPage,
          totalPage,
        })
      );
    }
  );

const addDataMappingActivityDataCategoryHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/data-category`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const reqJson = await req.json();
      const dataCategoryID =
        reqJson.dataCategoryID as string[];

      if (!dataCategoryID) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'dataCategoryID is required',
          })
        );
      }

      const dataCategories = dataCategoryID.map(
        (categoryId: any) =>
          db.dataMappingDataCategories.findFirst({
            where: {
              categoryID: {
                equals: categoryId,
              },
            },
          })
      );

      if (dataCategories.includes(null)) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'dataCategoryID is invalid',
          })
        );
      }

      dataCategories.forEach((dataCategory) => {
        db.dataMappingActivityDataCategory.create({
          id: uuid(),
          categoryID: dataCategory?.categoryID,
          activityID: activityId,
          name: dataCategory?.name,
          categoryClassifications:
            dataCategory?.categoryClassifications,
          organizationID: dataCategory?.organizationID,
          organization: dataCategory?.organization,
          groupID: dataCategory?.groupID,
          groupName: dataCategory?.groupName,
          dataSubjects: dataCategory?.dataSubjects,
          status: 'inactive',
          created_by: 'frontend developer',
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

const getDataMappingActivityDataCategoryHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/data-category/:dataCategoryId`,
    (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const dataCategoryId = req.params
        .dataCategoryId as string;

      const data =
        db.dataMappingActivityDataCategory.findFirst({
          where: {
            activityID: {
              equals: activityId,
            },
            categoryID: {
              equals: dataCategoryId,
            },
          },
        });

      if (!data) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'data mapping not found',
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
            ...data,
            source: data?.source ?? [],
            sourceID: data?.sourceID ?? [],
            id: undefined,
            activityId: undefined,
            dataCategoryId: undefined,
          },
        })
      );
    }
  );

const updateDataMappingActivityDataCategoryHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/data-category/:dataCategoryId`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const dataCategoryId = req.params
        .dataCategoryId as string;
      const reqJson = await req.json();

      console.log(activityId, dataCategoryId, reqJson);

      if (
        !activityId ||
        !dataCategoryId ||
        !reqJson.sourceID
      ) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message:
              'activityId, dataCategoryId, sourceID is required',
          })
        );
      }

      if (
        !db.dataMappingActivityDataCategory.findFirst({
          where: {
            activityID: {
              equals: activityId,
            },
            categoryID: {
              equals: dataCategoryId,
            },
          },
        })
      ) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'data mapping already exist',
          })
        );
      }

      const sourcesID = reqJson.sourceID as string[];
      const categorySources =
        testData?.dataMapping?.activity?.meta
          ?.categorySource;

      const selectedCategorySources = sourcesID.map(
        (sourceId: string) =>
          categorySources.find(
            (categorySource) =>
              categorySource.ObjectUUID === sourceId
          )
      );

      db.dataMappingActivityDataCategory.update({
        where: {
          activityID: {
            equals: activityId,
          },
          categoryID: {
            equals: dataCategoryId,
          },
        },
        data: {
          source: selectedCategorySources.map(
            (categorySource) => categorySource?.name
          ),
          sourceID: selectedCategorySources.map(
            (categorySource) => categorySource?.ObjectUUID
          ),
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

const deleteDataMappingActivityDataCategoryHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/data-category/:dataCategoryId`,
    (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const dataCategoryId = req.params
        .dataCategoryId as string;

      const dbQuery = {
        where: {
          activityID: {
            equals: activityId,
          },
          categoryID: {
            equals: dataCategoryId,
          },
        },
      };

      if (
        !db.dataMappingActivityDataCategory.findFirst(
          dbQuery
        )
      ) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'data mapping not found',
          })
        );
      }

      db.dataMappingActivityDataCategory.deleteMany(
        dbQuery
      );

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

export const dataMappingActivityDataCategoryHandlers = [
  listDataMappingActivityDataCategoryHandler,
  addDataMappingActivityDataCategoryHandler,
  getDataMappingActivityDataCategoryHandler,
  updateDataMappingActivityDataCategoryHandler,
  deleteDataMappingActivityDataCategoryHandler,
];
