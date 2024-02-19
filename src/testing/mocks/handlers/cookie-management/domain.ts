import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../test-data';
import { db } from '../../db';

const createCookieManagementDomainHandler = rest.post(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/domain`,
  async (req, res, ctx) => {
    const requestBody = await req.json();

    const domain = db.cookieManagementDomain.create({
      ...requestBody,
      domainID: uuid(),
      totalPageScan: Math.floor(Math.random() * 100),
      cookies: Math.floor(Math.random() * 100),
      scanDate: new Date().toISOString(),
      status: 'success',
      setting: JSON.stringify(
        testData.cookieManagement.domain.setting
      ),
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          ObjectUUID: domain.domainID,
          ...domain,
        },
      })
    );
  }
);

const deleteCookieManagementDomainHandler = rest.delete(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/domain/:domainId`,
  (req, res, ctx) => {
    const domainId = req.params.domainId as string;

    const domain = db.cookieManagementDomain.findFirst({
      where: {
        domainID: {
          equals: domainId,
        },
      },
    });

    if (!domain) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    db.cookieManagementDomain.delete({
      where: {
        domainID: {
          equals: domainId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const listCookieManagementDomainHandler = rest.get(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/domain`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pages_ize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const listDomain = db.cookieManagementDomain.findMany(
      {
        where: {
          name: {
            contains: search,
          },
        },
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: {
          scanDate: 'desc',
        },
      }
    );

    const currentPage = parseInt(page);
    const currentRecord = listDomain.length;
    const totalRecord = db.cookieManagementDomain.count();
    const totalPage = Math.ceil(
      totalRecord / parseInt(pageSize)
    );

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: listDomain?.map((item) => ({
          ...item,
          setting: undefined,
        })),
        currentPage,
        currentRecord,
        totalPage,
        totalRecord,
      })
    );
  }
);

const getCookieManagementDomainHandler = rest.get(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/domain/:domainId`,
  (req, res, ctx) => {
    const domainId = req.params.domainId as string;

    const domain = db.cookieManagementDomain.findFirst({
      where: {
        domainID: {
          equals: domainId,
        },
      },
    });

    if (!domain) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          setting: JSON.parse(domain?.setting),
        },
      })
    );
  }
);

const updateCookieManagementDomainHandler = rest.put(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/domain/:domainId`,
  async (req, res, ctx) => {
    const domainId = req.params.domainId as string;

    const requestBody = await req.json();

    const domain = db.cookieManagementDomain.findFirst({
      where: {
        domainID: {
          equals: domainId,
        },
      },
    });

    if (!domain) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    db.cookieManagementDomain.update({
      where: {
        domainID: {
          equals: domainId,
        },
      },
      data: {
        ...requestBody,
        setting:
          requestBody.setting &&
          JSON.stringify(requestBody.setting),
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

export const cookieManagementDomainHandlers = [
  createCookieManagementDomainHandler,
  deleteCookieManagementDomainHandler,
  listCookieManagementDomainHandler,
  getCookieManagementDomainHandler,
  updateCookieManagementDomainHandler,
];
