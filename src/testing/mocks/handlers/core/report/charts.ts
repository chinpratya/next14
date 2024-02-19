import { rest } from 'msw';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint-test';
import { testData } from '@/testing/test-data';

const listCoreReportChartsDashboardHandler = rest.get(
  `${API_ENDPOINT_CYBERFENCE_BASE_URL}/core/report/charts/dashboard`,
  async (_, res, ctx) => {
    const data = testData.core.coreReport.chartsDashboard;

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
        data: data,
        status: 'OK',
      })
    );
  }
);

export const coreReportChartsHandlers = [
  listCoreReportChartsDashboardHandler,
];
