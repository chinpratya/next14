import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

import { db } from '../../../db';

import { consentManagementCollectionPointElementHandlers } from './elements';
import { consentManagementCollectionPointHistoryHandlers } from './history';
import { consentManagementCollectionPointPreviewHandlers } from './preview';
import { consentManagementCollectionPointPurposeHandlers } from './purpose';

const listConsentManagementCollectionPointHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint`,
    (req, res, ctx) => {
      const data =
        db.consentManagementCollectionPoint.getAll();

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: data.map((item) => ({
            ...item,
            form: undefined,
          })),
        })
      );
    }
  );

const getConsentManagementCollectionPointMetaHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/meta/collectionpoint`,
    (req, res, ctx) => {
      const data =
        testData.consentManagement.collectionPoint.Meta;

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

const createConsentManagementCollectionPointHandler =
  rest.post(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint`,
    async (req, res, ctx) => {
      const body = await req.json();
      console.log('body', body);
      const data =
        db.consentManagementCollectionPoint.getAll();

      db.consentManagementCollectionPoint.create({
        ...data[0],
        CollectionPointID: uuid(),
        name: body?.name,
        status: 'draft',
        version: 1,
        createdDt: new Date().toISOString(),
        createdBy: 'frontend developer',
      });

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

const getConsentManagementCollectionPointHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/:collectionPointId`,
    (req, res, ctx) => {
      const collectionPointId = req.params
        .collectionPointId as string;

      const collectionPoint =
        db.consentManagementCollectionPoint.findFirst({
          where: {
            CollectionPointID: {
              equals: collectionPointId,
            },
          },
        });

      if (!collectionPoint) {
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
          data: {
            ...collectionPoint,
            form: undefined,
          },
        })
      );
    }
  );

const getConsentManagementCollectionPointPrivacyNoticeHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/privacynotice/:collectionpointId`,
    (req, res, ctx) => {
      const purpose =
        db.consentManagementCollectionPointPrivacyNotice.findFirst(
          {
            where: {
              id: {
                equals: '1',
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
          data: purpose,
        })
      );
    }
  );

const updateConsentManagementCollectionPoinPrivacyNoticetHandler =
  rest.put(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/privacynotice/:collectionpointId`,
    async (req, res, ctx) => {
      const payload = await req.json();
      const data =
        db.consentManagementCollectionPointPrivacyNotice.update(
          {
            where: {
              id: {
                equals: '1',
              },
            },
            data: {
              ...payload,
            },
          }
        );

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

const updateConsentManagementCollectionPointHandler =
  rest.put(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/:collectionPointId`,
    async (req, res, ctx) => {
      const collectionPointId = req.params
        .collectionpointId as string;
      const payload = await req.json();
      const data =
        db.consentManagementCollectionPoint.update({
          where: {
            CollectionPointID: {
              equals: collectionPointId,
            },
          },
          data: {
            ...payload,
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
          data,
        })
      );
    }
  );
const updateConsentManagementCollectionPointUsingHandler =
  rest.put(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/collectionpoint/using/:collectionPointId`,
    async (req, res, ctx) => {
      const collectionPointId = req.params
        .collectionpointId as string;
      const payload = await req.json();
      const data =
        db.consentManagementCollectionPoint.update({
          where: {
            CollectionPointID: {
              equals: collectionPointId,
            },
          },
          data: {
            ...payload,
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
          data,
        })
      );
    }
  );
export const consentManagementCollectionPointHandlers = [
  listConsentManagementCollectionPointHandler,
  createConsentManagementCollectionPointHandler,
  getConsentManagementCollectionPointHandler,
  getConsentManagementCollectionPointMetaHandler,
  updateConsentManagementCollectionPointHandler,
  getConsentManagementCollectionPointPrivacyNoticeHandler,
  updateConsentManagementCollectionPoinPrivacyNoticetHandler,
  updateConsentManagementCollectionPointUsingHandler,
  ...consentManagementCollectionPointPurposeHandlers,
  ...consentManagementCollectionPointPreviewHandlers,
  ...consentManagementCollectionPointElementHandlers,
  ...consentManagementCollectionPointHistoryHandlers,
];
