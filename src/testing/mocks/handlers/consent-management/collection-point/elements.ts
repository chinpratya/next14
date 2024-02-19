import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const deleteConsentManagementCollectionPointHandler =
  rest.delete(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/element/:collectionpointId`,
    async (req, res, ctx) => {
      const collectionpointId = req.params
        .collectionpointId as string;

      const data =
        db.consentManagementCollectionPoint.delete({
          where: {
            CollectionPointID: {
              equals: collectionpointId,
            },
          },
        });

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const getConsentManagementCollectionPointElementHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/element/:collectionpointId`,
    (req, res, ctx) => {
      const data =
        db.consentManagementCollectionPointElement.findFirst(
          {
            where: {
              id: {
                equals:
                  'b8770d57-4809-4848-a38a-f3bd7d62614c',
              },
            },
          }
        );

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

export const consentManagementCollectionPointElementHandlers =
  [
    deleteConsentManagementCollectionPointHandler,
    getConsentManagementCollectionPointElementHandler,
  ];
