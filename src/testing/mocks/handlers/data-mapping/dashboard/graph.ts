import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';

const getDataMappingDashboardGraphDataElementHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/graph/data-element`,
    (req, res, ctx) => {
      const data =
        testData.dataMapping.dashbaord.graph.dataElement;

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

const getDataMappingDashboardGraphClassificationHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/dashboard/graph/classification`,
    (req, res, ctx) => {
      const data =
        testData.dataMapping.dashbaord.graph
          .classification;

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

export const dataMappingDashboardGraphHandlers = [
  getDataMappingDashboardGraphDataElementHandler,
  getDataMappingDashboardGraphClassificationHandler,
];
