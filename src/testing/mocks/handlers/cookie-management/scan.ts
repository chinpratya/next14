import { rest } from 'msw';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../db';

const scanCookieManagementHandler = rest.post(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/scan/:domainId`,
  async (req, res, ctx) => {
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

    db.cookieManagementDomain.update({
      where: {
        domainID: {
          equals: domainId,
        },
      },
      data: {
        status: 'pending',
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

const updateCookieManagementScanHandler = rest.put(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/cookie/:domainId`,
  async (req, res, ctx) => {
    const domainId = req.params.domainId as string;

    const updateCookies = await req.json();

    const where = {
      domainID: {
        equals: domainId,
      },
    };

    const domain = db.cookieManagementDomain.findFirst({
      where,
    });
    const category =
      db.cookieManagementCategory.findFirst({
        where,
      });

    if (!category || !domain) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    if (updateCookies.cookies) {
      const cookies = JSON.parse(category.cookies).map(
        (cookie: any) => {
          const updateCookie = updateCookies.cookies.find(
            (updateCookie: any) =>
              updateCookie.name === cookie.name
          );

          if (updateCookie) {
            return {
              ...cookie,
              ...updateCookie,
            };
          }

          return cookie;
        }
      );

      db.cookieManagementCategory.update({
        where,
        data: {
          cookies: JSON.stringify(cookies),
        },
      });
    }

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

export const cookieManagementScanHandlers = [
  scanCookieManagementHandler,
  updateCookieManagementScanHandler,
];
