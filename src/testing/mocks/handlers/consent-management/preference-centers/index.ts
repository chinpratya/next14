import _ from 'lodash';
import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

import { consentManagementPreferenceActivityHandlers } from './activity';
import { consentManagementPreferenceCentersPreviewHandlers } from './preview';

const listConsentManagementPreferenceCentersHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams?.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';
      const search =
        req.url.searchParams.get('search') ?? '';

      const preferenceCenters =
        db.consentManagementPreferenceCenters.findMany({
          take: parseInt(pageSize),
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          where: {
            preferenceID: {
              contains: search,
            },
          },
        });

      const totalRecord =
        db.consentManagementPreferenceCenters.count();
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
          data:
            preferenceCenters?.map(
              (preferenceCenter) => ({
                ...preferenceCenter,
                form: undefined,
              })
            ) ?? [],
          currentRecord: preferenceCenters?.length ?? 0,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const createConsentManagementPreferenceCentersHandler =
  rest.post(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference`,
    async (req, res, ctx) => {
      const data = await req.json();

      const activity = _.map(data.activityID, (v) => {
        return db.dataMappingActivity.findFirst({
          where: {
            ObjectUUID: {
              equals: v,
            },
          },
        });
      });

      db.consentManagementPreferenceCenters.create({
        ...data,
        activitys: _.map(activity, (value) => {
          return {
            activityID: value?.ObjectUUID ?? '',
            activity: value?.name ?? '',
          };
        }),
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

const getConsentManagementPreferenceCentersHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference/:preferenceId`,
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
            ...preference,
            form: undefined,
          },
        })
      );
    }
  );

const updateConsentManagementPreferenceCentersHandler =
  rest.put(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/preference/:preferenceId`,
    async (req, res, ctx) => {
      const preferenceId = req.params
        .preferenceId as string;
      const data = await req.json();

      const activity = _.map(data.activityID, (v) => {
        return db.dataMappingActivity.findFirst({
          where: {
            ObjectUUID: {
              equals: v,
            },
          },
        });
      });

      const updatedData =
        db.consentManagementPreferenceCenters.update({
          where: {
            preferenceID: {
              equals: preferenceId,
            },
          },
          data: {
            ...data,
            activitys: _.map(activity, (value) => {
              return {
                activityID: value?.ObjectUUID ?? '',
                activity: value?.name ?? '',
              };
            }),
            updatedDt: new Date().toISOString(),
            updatedBy: 'frontend developer',
          },
        });

      if (!updatedData)
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

export const consentManagementPreferenceCentersHandlers =
  [
    ...consentManagementPreferenceActivityHandlers,
    ...consentManagementPreferenceCentersPreviewHandlers,
    listConsentManagementPreferenceCentersHandler,
    createConsentManagementPreferenceCentersHandler,
    getConsentManagementPreferenceCentersHandler,
    updateConsentManagementPreferenceCentersHandler,
  ];
