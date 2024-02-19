import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const listConsentManagementCollectionPointPurposeHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/purpose/:collectionPointId`,
    (req, res, ctx) => {
      const collectionPointId = req.params
        .collectionPointId as string;

      if (!collectionPointId) {
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

      const purpose = db.dataMappingPurpose.findMany({});

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: purpose,
        })
      );
    }
  );

export const consentManagementCollectionPointPurposeHandlers =
  [listConsentManagementCollectionPointPurposeHandler];
