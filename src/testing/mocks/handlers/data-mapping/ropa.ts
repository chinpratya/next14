import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../db';

const listDataMappingRopaHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/ropa`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = db.dataMappingRopa.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
    });

    const totalRecord = db.dataMappingRopa.count();
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

const createDataMappingRopaHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/ropa`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.dataMappingRopa.create({
      ...data,
      created_dt: new Date().toISOString(),
      created_by: 'admin',
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

export const dataMappingDataRopaHandlers = [
  listDataMappingRopaHandler,
  createDataMappingRopaHandler,
];
