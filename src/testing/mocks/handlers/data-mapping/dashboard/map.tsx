import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getDataMappingDashboardMapThirdPartyLocationHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/map/third-party-location`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        testData.dataMapping.dashbaord.map
          .thirdPartyLocation;

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

export const dataMappingDashboardMapHandlers = [
  getDataMappingDashboardMapThirdPartyLocationHandler,
];
