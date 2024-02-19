import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../test-data';
import { db } from '../../db';

const listDataMappingDataProcessorHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-processor`,
  (req, res, ctx) => {
    const search =
      req.url.searchParams.get('search') ?? '';
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const dataProcessors =
      db.dataMappingDataProcessor.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: {
          created_dt: 'desc',
        },
      });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: dataProcessors.map((dataProcessor) => ({
          ...dataProcessor,
          address: undefined,
          country: undefined,
          countryID: undefined,
          positionID: undefined,
          organizationTypeID: undefined,
          personalTypeID: undefined,
          email: undefined,
          tel: undefined,
          url: undefined,
          note: undefined,
        })),
        currentRecord: dataProcessors.length,
        totalRecord: db.dataMappingDataProcessor.count(),
        currentPage: parseInt(page),
        totalPage:
          db.dataMappingDataProcessor.count() >
          parseInt(pageSize)
            ? Math.floor(
                db.dataMappingDataProcessor.count() /
                  parseInt(pageSize)
              )
            : 1,
      })
    );
  }
);

const getDataMappingDataProcessorHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-processor/:dataProcessorId`,
  (req, res, ctx) => {
    const dataProcessorId = req.params
      .dataProcessorId as string;

    const dataProcessor =
      db.dataMappingDataProcessor.findFirst({
        where: {
          dataProcessorID: {
            equals: dataProcessorId,
          },
        },
      });

    if (!dataProcessor) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Can`t find data processor!',
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: dataProcessor,
      })
    );
  }
);

const deleteDataMappingDataProcessorHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-processor/:dataProcessorId`,
  (req, res, ctx) => {
    const dataProcessorId = req.params
      .dataProcessorId as string;

    const dataProcessor =
      db.dataMappingDataProcessor.findFirst({
        where: {
          dataProcessorID: {
            equals: dataProcessorId,
          },
        },
      });

    if (!dataProcessor) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Can`t find data processor!',
        })
      );
    }

    db.dataMappingDataProcessor.delete({
      where: {
        dataProcessorID: {
          equals: dataProcessorId,
        },
      },
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const getDataMappingDataProcessorMetaHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/meta/data-processor`,
  (req, res, ctx) => {
    const data =
      testData?.dataMapping?.dataProcessor?.meta;

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data,
      })
    );
  }
);

const createDataMappingDataProcessorHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-processor`,
  async (req, res, ctx) => {
    const requestBody = await req.json();

    const position =
      testData.dataMapping.dataProcessor.meta.position.find(
        (item) =>
          item.ObjectUUID === requestBody.positionID
      )?.name;
    const organizationType =
      testData.dataMapping.dataProcessor.meta.organizationType.find(
        (item) =>
          item.ObjectUUID ===
          requestBody.organizationTypeID
      )?.name;
    const personalType =
      testData.dataMapping.dataProcessor.meta.personalType.find(
        (item) =>
          item.ObjectUUID === requestBody.personalTypeID
      )?.name;

    db.dataMappingDataProcessor.create({
      ...requestBody,
      dataProcessorID: uuid(),
      created_by: 'frontend developer',
      created_dt: new Date().toISOString(),
      position,
      organizationType,
      personalType,
      updated_by: '',
      updated_dt: '',
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const updateDataMappingDataProcessorHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/data-processor/:dataProcessorId`,
  async (req, res, ctx) => {
    const dataProcessorId = req.params
      .dataProcessorId as string;
    const requestBody = await req.json();

    const dataProcessor =
      db.dataMappingDataProcessor.findFirst({
        where: {
          dataProcessorID: {
            equals: dataProcessorId,
          },
        },
      });

    if (!dataProcessor) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Can`t find data processor!',
        })
      );
    }

    const position =
      testData.dataMapping.dataProcessor.meta.position.find(
        (item) =>
          item.ObjectUUID === requestBody.positionID
      )?.name;
    const organizationType =
      testData.dataMapping.dataProcessor.meta.organizationType.find(
        (item) =>
          item.ObjectUUID ===
          requestBody.organizationTypeID
      )?.name;
    const personalType =
      testData.dataMapping.dataProcessor.meta.personalType.find(
        (item) =>
          item.ObjectUUID === requestBody.personalTypeID
      )?.name;

    db.dataMappingDataProcessor.update({
      where: {
        dataProcessorID: {
          equals: dataProcessorId,
        },
      },
      data: {
        ...requestBody,
        position,
        organizationType,
        personalType,
        updated_by: 'frontend developer',
        updated_dt: new Date().toISOString(),
      },
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

export const dataMappingDataProcessorHandlers = [
  listDataMappingDataProcessorHandler,
  getDataMappingDataProcessorHandler,
  deleteDataMappingDataProcessorHandler,
  getDataMappingDataProcessorMetaHandler,
  createDataMappingDataProcessorHandler,
  updateDataMappingDataProcessorHandler,
];
