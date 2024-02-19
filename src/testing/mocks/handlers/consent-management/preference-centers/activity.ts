import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';
import { db } from '../../../db';

const getConsentManagementPreferenceActivityHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference/:preferenceId/activity`,
    (req, res, ctx) => {
      const activityId = req.params
        .preferenceId as string;
      if (!activityId) {
        return res(
          ctx.status(500),
          ctx.delay(1000),
          ctx.json({
            status: 500,
            statusCode: 500,
            message: 'activityId is required',
          })
        );
      }

      const purposes =
        testData.consentManagement.purpose.list;

      const activities = db.dataMappingActivity.findMany(
        {}
      );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: activities?.map((activity) => ({
            activityID: activity.ObjectUUID,
            activity: activity.name,
            purposes: [
              purposes[
                Math.floor(
                  Math.random() * purposes.length
                )
              ],
            ],
          })),
        })
      );
    }
  );

export const consentManagementPreferenceActivityHandlers =
  [getConsentManagementPreferenceActivityHandler];
