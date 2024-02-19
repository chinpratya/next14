import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const listMetaCountryHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/meta/country`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: testData.meta.country.list,
      })
    );
  }
);

export const metaCountryHandlers = [
  listMetaCountryHandler,
];
