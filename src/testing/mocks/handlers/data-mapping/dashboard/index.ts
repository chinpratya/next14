import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';

import { dataMappingDashboardGraphHandlers } from './graph';
import { dataMappingDashboardMapHandlers } from './map';

const getDataMappingDashboardTotalCountHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/count`,
  (req, res, ctx) => {
    const data = testData.dataMapping.dashbaord.count;

    if (!data) {
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
const listDataMappingDashboardLawfulBasisHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/lawful-basis`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        testData.dataMapping.dashbaord.lawfulBasis;

      const totalRecord = data.length;
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
const listDataMappingDashboardRightsHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/rights`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = testData.dataMapping.dashbaord.rights;

    const totalRecord = data.length;
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
const listDataMappingDashboardConsentHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/consent`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = testData.dataMapping.dashbaord.consent;

    const totalRecord = data.length;
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

const listDataMappingDashboardDsarHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/dsar`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';

    const data = testData.dataMapping.dashbaord.dsar;

    const totalRecord = data.length;
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

const listDataMappingDashboardThirdPartyLocationHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/third-party-location`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        testData.dataMapping.dashbaord.thirdPartyLocation;

      const totalRecord = data.length;
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

export const dataMappingDashboardHandlers = [
  ...dataMappingDashboardGraphHandlers,
  ...dataMappingDashboardMapHandlers,
  listDataMappingDashboardLawfulBasisHandler,
  listDataMappingDashboardRightsHandler,
  getDataMappingDashboardTotalCountHandler,
  listDataMappingDashboardConsentHandler,
  listDataMappingDashboardDsarHandler,
  listDataMappingDashboardThirdPartyLocationHandler,
];
