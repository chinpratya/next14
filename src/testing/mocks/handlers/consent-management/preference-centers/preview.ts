import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const getConsentManagementPreferenceCentersPreview =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference/preview/:preferenceId`,
    (req, res, ctx) => {
      const preferenceId = req.params
        .preferenceId as string;
      const preference =
        db.consentManagementPreferenceCenters.findFirst({
          where: {
            preferenceID: {
              equals: preferenceId,
            },
          },
        });

      if (!preference) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Not found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 'success',
          statusCode: 200,
          message: 'OK',
          data: {
            form: JSON.parse(preference.form),
            createdBy: preference.createdBy,
            createdDt: preference.createdDt,
            updatedBy: preference.updatedBy,
            updatedDt: preference.updatedDt,
          },
        })
      );
    }
  );

const updateConsentManagementPreferenceCentersPreview =
  rest.put(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference/preview/:preferenceId`,
    async (req, res, ctx) => {
      const preferenceId = req.params
        .preferenceId as string;

      const preference =
        db.consentManagementPreferenceCenters.findFirst({
          where: {
            preferenceID: {
              equals: preferenceId,
            },
          },
        });

      if (!preference) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            message: 'Not found',
          })
        );
      }

      const reqJson = await req.json();

      db.consentManagementPreferenceCenters.update({
        where: {
          preferenceID: {
            equals: preferenceId,
          },
        },
        data: {
          form: JSON.stringify(reqJson.form),
          updatedBy: 'admin',
          updatedDt: new Date().toISOString(),
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 'success',
          statusCode: 200,
          message: 'OK',
        })
      );
    }
  );

export const consentManagementPreferenceCentersPreviewHandlers =
  [
    getConsentManagementPreferenceCentersPreview,
    updateConsentManagementPreferenceCentersPreview,
  ];
