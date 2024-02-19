import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

const listConsentManagementTransactionHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/transaction`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const transaction =
      db.consentManagementTransaction.findMany({
        take: parseInt(pageSize),
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        where: {
          purposeID: {
            contains: search,
          },
        },
      });

    const totalRecord =
      db.consentManagementTransaction.count();
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
        data: transaction ?? [],
        currentRecord: transaction?.length ?? 0,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getConsentManagementTransactionHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/transaction/:transactionId`,
  (req, res, ctx) => {
    const transactionId = req.params
      .transactionId as string;

    const transaction =
      db.consentManagementTransaction.findFirst({
        where: {
          purposeID: {
            equals: transactionId,
          },
        },
      });

    if (!transaction) {
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
        data: transaction,
      })
    );
  }
);

const getConsentManagementTransactionPurposeHandler =
  rest.get(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/transaction/purpose/:transactionId`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: testData?.consentManagement.transaction
            .purpose,
        })
      );
    }
  );

export const consentManagementTransactionHandlers = [
  listConsentManagementTransactionHandler,
  getConsentManagementTransactionHandler,
  getConsentManagementTransactionPurposeHandler,
];
