import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../test-data';
import { db } from '../../db';

const listConsentManagementReceiptHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/receipt`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const receipt = db.consentManagementReceipt.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        receiptsID: {
          contains: search,
        },
      },
    });

    const totalRecord =
      db.consentManagementReceipt.count();
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
        data: receipt ?? [],
        currentRecord: receipt?.length ?? 0,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getConsentManagementReceiptHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/receipt/:receiptId`,
  (req, res, ctx) => {
    const receiptId = req.params.receiptId as string;

    const receipt = db.consentManagementReceipt.findFirst(
      {
        where: {
          receiptsID: {
            equals: receiptId,
          },
        },
      }
    );

    if (!receipt) {
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
        data: receipt,
      })
    );
  }
);

const getConsentManagementReceiptFormHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/receipt/from/:receiptId`,
  (req, res, ctx) => {
    const receiptId = req.params.receiptId as string;

    const receipt = db.consentManagementReceipt.findFirst(
      {
        where: {
          receiptsID: {
            equals: receiptId,
          },
        },
      }
    );

    if (!receipt) {
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
          form: [],
          data: [],
        },
      })
    );
  }
);

const getConsentManagementReceiptPurposeHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/receipt/purpose/:receiptId`,
    (req, res, ctx) => {
      const receiptId = req.params.receiptId as string;
      const receipt =
        db.consentManagementReceipt.findFirst({
          where: {
            receiptsID: {
              equals: receiptId,
            },
          },
        });

      if (!receipt) {
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
          data: testData.consentManagement.purpose.list,
        })
      );
    }
  );

export const consentManagementReceiptHandlers = [
  listConsentManagementReceiptHandler,
  getConsentManagementReceiptHandler,
  getConsentManagementReceiptFormHandler,
  getConsentManagementReceiptPurposeHandler,
];
