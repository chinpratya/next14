import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getConsentManagementActivityPreviewHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/activity/preview/:activityId`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: testData?.consentManagement.purpose.list,
        })
      );
    }
  );

export const consentManagementActivityPreviewHandlers = [
  getConsentManagementActivityPreviewHandler,
];
