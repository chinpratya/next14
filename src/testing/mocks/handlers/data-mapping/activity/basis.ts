import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const getDataMappingActivityBasisHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const basisId = req.params.basisId as string;

    const basis = db.dataMappingActivityBasis.findFirst({
      where: {
        activityID: {
          equals: activityId,
        },
        basisID: {
          equals: basisId,
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
        data: basis,
      })
    );
  }
);

const updateDataMappingActivityBasisHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId`,
  async (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const basisId = req.params.basisId as string;
    const data = await req.json();

    const updatedData =
      db.dataMappingActivityBasis.update({
        where: {
          activityID: {
            equals: activityId,
          },
          basisID: {
            equals: basisId,
          },
        },
        data: {
          ...data,
        },
      });

    if (!updatedData) {
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

const listDataMappingActivityBasisPurposeHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId/purpose`,
    (req, res, ctx) => {
      const basisId = req.params.basisId as string;
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        db.dataMappingActivityBasisPurpose.findMany({
          where: {
            basisID: {
              equals: basisId,
            },
          },
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
        });

      const totalRecord =
        db.dataMappingActivityBasisPurpose.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
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

const addDataMappingActivityBasisPurposeHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId/purpose`,
    async (req, res, ctx) => {
      const body = await req.json();
      const basisId = req.params.basisId as string;
      const purposeID = body?.purposeID as string[];

      const purposes = purposeID.map((purposeId) => {
        return db.dataMappingPurpose.findFirst({
          where: {
            purposeID: {
              equals: purposeId,
            },
          },
        });
      });

      if (purposes.find((item) => !item)) {
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

      purposes.forEach((purpose) => {
        db.dataMappingActivityBasisPurpose.create({
          purposeID: purpose?.purposeID,
          basisID: basisId,
          name: purpose?.name,
          group: purpose?.group,
          dataUsagePeriod: {
            day: '1',
            month: '2',
            year: '3',
            description:
              'This is the year of the category',
          },
        });
      });

      purposes.forEach((purpose) => {
        db.consentManagementActivityPurpose.create({
          purposeID: purpose?.purposeID,
          name: purpose?.name,
          group: purpose?.group,
          createdDt: new Date().toISOString(),
          createdBy: 'frontend developer',
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

const removeDataMappingActivityBasisPurposeHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId/purpose/:purposeId`,
    (req, res, ctx) => {
      const purposeId = req.params.purposeId as string;

      db.dataMappingActivityBasisPurpose.delete({
        where: {
          purposeID: {
            equals: purposeId,
          },
        },
      });

      db.consentManagementActivityPurpose.delete({
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
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const listDataMappingActivityBasisPurposeDataCategoryHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId/purpose/:purposeId/data-category`,
    (req, res, ctx) => {
      const basisId = req.params.basisId as string;
      const purposeId = req.params.purposeId as string;

      const data =
        db.dataMappingActivityBasisPurposeDataCategory.findMany(
          {
            where: {
              basisID: {
                equals: basisId,
              },
              purposeID: {
                equals: purposeId,
              },
            },
          }
        );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: data,
        })
      );
    }
  );

const addDataMappingActivityBasisPurposeDataCategoryHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId/purpose/:purposeId/data-category`,
    async (req, res, ctx) => {
      const basisId = req.params.basisId as string;
      const purposeId = req.params.purposeId as string;
      const data = await req.json();

      const dataCategoryID =
        data?.dataCategoryID as string[];

      const dataCategories = dataCategoryID.map(
        (categoryId) => {
          return db.dataMappingDataCategories.findFirst({
            where: {
              categoryID: {
                equals: categoryId,
              },
            },
          });
        }
      );

      dataCategories.forEach((dataCategory) => {
        db.dataMappingActivityBasisPurposeDataCategory.create(
          {
            basisID: basisId,
            purposeID: purposeId,
            dataCategoryID: dataCategory?.categoryID,
            name: dataCategory?.name,
            dataElements: [
              {
                dataElementID: 'xxx',
                name: 'xxx',
                classificationID: 'xxx',
                classificationName: 'xxx',
              },
            ],
          }
        );
      });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const removeDataMappingActivityBasisPurposeDataCategoryHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/basis/:basisId/purpose/:purposeId/data-category/:dataCategoryId`,
    (req, res, ctx) => {
      const purposeId = req.params.purposeId as string;
      const dataCategoryId = req.params
        .dataCategoryId as string;

      db.dataMappingActivityBasisPurposeDataCategory.delete(
        {
          where: {
            purposeID: {
              equals: purposeId,
            },
            dataCategoryID: {
              equals: dataCategoryId,
            },
          },
        }
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

export const dataMappingActivityBasisHandlers = [
  getDataMappingActivityBasisHandler,
  updateDataMappingActivityBasisHandler,
  listDataMappingActivityBasisPurposeHandler,
  addDataMappingActivityBasisPurposeHandler,
  removeDataMappingActivityBasisPurposeHandler,
  listDataMappingActivityBasisPurposeDataCategoryHandler,
  addDataMappingActivityBasisPurposeDataCategoryHandler,
  removeDataMappingActivityBasisPurposeDataCategoryHandler,
];
