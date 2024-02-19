import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';
import { uid } from '@/utils';

import { db } from '../../db';

const createDataMappingDataElementHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-element`,
  async (req, res, ctx) => {
    const data = await req.json();

    const dataClassification =
      testData.dataMapping.elements.meta.find(
        (meta) =>
          meta.ObjectUUID === data.dataClassificationID
      )?.name;

    db.dataMappingDataElement.create({
      ...data,
      dataElementID: uid(),
      created_dt: new Date().toISOString(),
      created_by: 'admin',
      updated_dt: new Date().toISOString(),
      updated_by: 'admin',
      dataClassification,
      organization: 'Security Pitch',
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

const listDataMappingDataElementHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-element`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const data = db.dataMappingDataElement.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord = db.dataMappingDataElement.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
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

const listDataMappingDataElementMetaHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/meta/data-element`,
  (req, res, ctx) => {
    const data = db.dataMappingDataElementMeta.findMany(
      {}
    );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          dataClassification: data,
        },
      })
    );
  }
);

const deleteDataMappingDataElementHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-element/:dataElementId`,
  async (req, res, ctx) => {
    const dataElementId = req.params
      .dataElementId as string;

    const data = db.dataMappingDataElement.delete({
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

const updateDataMappingDataElementHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-element/:dataElementId`,
  async (req, res, ctx) => {
    const dataElementId = req.params
      .dataElementId as string;

    const data = await req.json();
    const dataClassification =
      testData.dataMapping.elements.meta.find(
        (meta) =>
          meta.ObjectUUID === data.dataClassificationID
      )?.name;

    const updatedData = db.dataMappingDataElement.update({
      where: {
        dataElementID: {
          equals: dataElementId,
        },
      },
      data: {
        ...data,
        dataClassification,
      },
    });

    if (!updatedData)
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

export const dataMappingDataElementHandlers = [
  listDataMappingDataElementHandler,
  deleteDataMappingDataElementHandler,
  listDataMappingDataElementMetaHandler,
  updateDataMappingDataElementHandler,
  createDataMappingDataElementHandler,
];
