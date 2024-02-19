import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const getConsentManagementCollectionPointPreviewHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/preview/:collectionPointId`,
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

      const data =
        db.consentManagementCollectionPoint.findFirst({
          where: {
            CollectionPointID: {
              equals: collectionPointId,
            },
          },
        });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: {
            form: JSON.parse(data?.form ?? '{}'),
            createdBy: data?.createdBy,
            createdDt: data?.createdDt,
            updatedBy: data?.updatedBy,
            updatedDt: data?.updatedDt,
          },
        })
      );
    }
  );

const updateConsentManagementCollectionPoinPreviewtHandler =
  rest.post(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/preview/:collectionPointId`,
    async (req, res, ctx) => {
      const collectionPointId = req.params
        .collectionPointId as string;

      const payload = await req.json();

      const data =
        db.consentManagementCollectionPoint.update({
          where: {
            CollectionPointID: {
              equals: collectionPointId,
            },
          },
          data: {
            status: payload.isPublish
              ? 'publish'
              : 'draft',
            form: JSON.stringify(payload.form),
            updatedDt: new Date().toISOString(),
          },
        });

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
        })
      );
    }
  );
export const consentManagementCollectionPointPreviewHandlers =
  [
    getConsentManagementCollectionPointPreviewHandler,
    updateConsentManagementCollectionPoinPreviewtHandler,
  ];
