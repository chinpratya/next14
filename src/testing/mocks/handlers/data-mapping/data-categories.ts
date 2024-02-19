import _ from 'lodash';
import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { uid } from '@/utils';

import { testData } from '../../../test-data';
import { db } from '../../db';

const listDataMappingDataCategoriesHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = db.dataMappingDataCategories.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord =
      db.dataMappingDataCategories.count();
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

const listDataMappingDataElementOfCategoriesHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category/:dataCategoryId/data-element`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        db.dataMappingDataElementOfCategories.findMany({
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          orderBy: {
            created_dt: 'desc',
          },
        });

      const totalRecord =
        db.dataMappingDataElementOfCategories.count();
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
const addDataMappingDataElementOfCategoriesHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category/:dataCategoryId/data-element`,
    async (req, res, ctx) => {
      const data = await req.json();
      const dataCategoriesId = req.params
        .dataCategoriesId as string;
      _.map(data?.dataElementID ?? [], (value) => {
        const findData = _.find(
          testData.dataMapping.elements.list,
          (v) => v.dataElementID === value
        );
        db.dataMappingDataElementOfCategories.create({
          dataElementID: findData?.dataElementID,
          dataCategoryID: dataCategoriesId,
          name: findData?.name,
          dataClassification:
            findData?.dataClassification,
          dataClassificationID:
            findData?.dataClassificationID,
          created_dt: '2021-08-31T08:00:00.000Z',
          updated_dt: '2021-08-31T08:00:00.000Z',
          created_by: 'Sample Data',
          updated_by: 'Sample Data',
        });
      });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const deleteDataMappingDataElementOfCategoryHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category/:dataCategoryID/data-element/:dataElementID`,
    async (req, res, ctx) => {
      const dataElementId = req.params
        .dataElementID as string;

      const data =
        db.dataMappingDataElementOfCategories.delete({
          where: {
            dataElementID: {
              equals: dataElementId,
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

const getDataMappingMetaCategoriesHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/meta/data-category`,
  (req, res, ctx) => {
    const data =
      testData.dataMapping.dataCategories.metaCategories;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        statusCode: 200,
        code: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

const createDataMappingDataCategoriesHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category`,
  async (req, res, ctx) => {
    const data = await req.json();
    const id = uid();

    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });

    const group = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: data.groupID,
        },
      },
    });

    const DataSubject = _.map(
      data.dataSubjectID,
      (value) =>
        db.dataMappingGroup.findFirst({
          where: {
            groupID: {
              equals: value,
            },
          },
        })
    );

    const metaCategories =
      testData.dataMapping.dataCategories.metaCategories
        .categoryClassification;
    const categoryClassifications = _.map(
      data.categoryClassificationID,
      (value) =>
        _.find(
          metaCategories,
          (v) => v.ObjectUUID === value
        )
    );

    db.dataMappingDataCategories.create({
      ...data,
      categoryID: id,
      organization: organization?.department_name ?? '',
      organizationID: organization?.departmentId ?? '',
      groupName: group?.name ?? '',
      group: group?.groupID ?? '',
      dataSubjects: _.map(DataSubject, (value) => {
        return {
          dataSubjectID: value?.groupID ?? '',
          dataSubjectName: value?.name ?? '',
        };
      }),
      categoryClassifications: _.map(
        categoryClassifications,
        (value) => {
          return {
            categoryClassificationID:
              value?.ObjectUUID ?? '',
            categoryClassificationName: value?.name ?? '',
          };
        }
      ),
      status: 'inactive',
      created_dt: new Date().toISOString(),
      created_by: 'frontend developer',
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        categoryID: id,
      })
    );
  }
);

const getDataMappingDataCategoriesHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category/:dataCategoriesId`,
  (req, res, ctx) => {
    const dataCategoriesId = req.params
      .dataCategoriesId as string;

    const category =
      db.dataMappingDataCategories.findFirst({
        where: {
          categoryID: {
            equals: dataCategoriesId,
          },
        },
      });

    if (!category) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          message: 'Can`t find data categories!',
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data: category,
        code: 200,
        message: 'success',
      })
    );
  }
);

const updateDataMappingDataCategoriesHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category/:dataCategoriesId`,
  async (req, res, ctx) => {
    const dataCategoriesId = req.params
      .dataCategoriesId as string;
    const data = await req.json();
    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });
    const group = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: data.groupID,
        },
      },
    });
    const Datasubject = _.map(
      data.dataSubjectID,
      (value) =>
        db.dataMappingGroup.findFirst({
          where: {
            groupID: {
              equals: value,
            },
          },
        })
    );
    const metaCategories =
      testData.dataMapping.dataCategories.metaCategories
        .categoryClassification;
    const categoryClassifications = _.map(
      data.categoryClassificationID,
      (value) =>
        _.find(
          metaCategories,
          (v) => v.ObjectUUID === value
        )
    );

    const updatedData =
      db.dataMappingDataCategories.update({
        where: {
          categoryID: {
            equals: dataCategoriesId,
          },
        },
        data: {
          ...data,
          organization:
            organization?.department_name ?? '',
          organizationID:
            organization?.departmentId ?? '',
          groupName: group?.name ?? '',
          group: group?.groupID ?? '',
          dataSubjects: _.map(Datasubject, (value) => {
            return {
              dataSubjectID: value?.groupID ?? '',
              dataSubjectName: value?.name ?? '',
            };
          }),
          categoryClassifications: _.map(
            categoryClassifications,
            (value) => {
              return {
                categoryClassificationID:
                  value?.ObjectUUID ?? '',
                categoryClassificationName:
                  value?.name ?? '',
              };
            }
          ),
          updated_dt: new Date().toISOString(),
        },
      });

    if (!updatedData) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: updatedData,
      })
    );
  }
);

const deleteDataMappingDataCategoriesHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-category/:dataCategoryID`,
    async (req, res, ctx) => {
      const dataCategoryId = req.params
        .dataCategoryID as string;

      const data = db.dataMappingDataCategories.delete({
        where: {
          categoryID: {
            equals: dataCategoryId,
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

export const dataMappingDataCategoriesHandlers = [
  listDataMappingDataCategoriesHandler,
  createDataMappingDataCategoriesHandler,
  getDataMappingDataCategoriesHandler,
  updateDataMappingDataCategoriesHandler,
  getDataMappingMetaCategoriesHandler,
  listDataMappingDataElementOfCategoriesHandler,
  addDataMappingDataElementOfCategoriesHandler,
  deleteDataMappingDataElementOfCategoryHandler,
  deleteDataMappingDataCategoriesHandler,
];
