import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const listConsentManagementActivityPurposeHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/activity/:activityId`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';

      const data =
        db.consentManagementActivityPurpose.findMany({
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
        });

      const totalRecord =
        db.consentManagementActivityPurpose.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

export const consentManagementActivityPurposeHandlers = [
  listConsentManagementActivityPurposeHandler,
];
