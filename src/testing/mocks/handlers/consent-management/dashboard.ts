import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../test-data';
import { db } from '../../db';

const getConsentManagementDashboardCountHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/dashboard/count`,
    (req, res, ctx) => {
      const data =
        testData.consentManagement.dashboard.count;

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

const getConsentManagementDashboardConsentSourceHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/dashboard/source`,
    (req, res, ctx) => {
      const data =
        testData.consentManagement.dashboard.consent;

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

const getConsentManagementDashboardActivityHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/dashboard/activity`,
    (req, res, ctx) => {
      const data =
        testData.consentManagement.dashboard.activity;

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

const listConsentManagementDashboardAcceptHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/dashboard/accept`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams?.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';
      const search =
        req.url.searchParams.get('search') ?? '';

      const data =
        db.consentManagementDashboardAccept.findMany({
          take: parseInt(pageSize),
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          where: {
            activityID: {
              contains: search,
            },
          },
        });

      const totalRecord =
        db.consentManagementDashboardAccept.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: data ?? [],
          currentRecord: data?.length ?? 0,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );
export const consentManagementDashboardHandlers = [
  getConsentManagementDashboardCountHandler,
  getConsentManagementDashboardConsentSourceHandler,
  getConsentManagementDashboardActivityHandler,
  listConsentManagementDashboardAcceptHandler,
];
