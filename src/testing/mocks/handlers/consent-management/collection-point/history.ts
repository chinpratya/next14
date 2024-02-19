import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const listConsentManagementCollectionPointHistoryHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/historycollectionpoint/:collectionpointID`,
    (req, res, ctx) => {
      const data =
        db.consentManagementCollectionPointHistory.getAll();

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: data,
        })
      );
    }
  );

export const consentManagementCollectionPointHistoryHandlers =
  [listConsentManagementCollectionPointHistoryHandler];
