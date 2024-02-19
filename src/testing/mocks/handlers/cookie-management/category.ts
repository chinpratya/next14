import { rest } from 'msw';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../db';

const createCookieManagementCategoryHandler = rest.post(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/category/:domainId`,
  async (req, res, ctx) => {
    const domainId = req.params.domainId as string;
    const requestBody = await req.json();

    const domain = db.cookieManagementCategory.findFirst({
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

    const category = JSON.parse(domain.category);
    category.push(requestBody);

    db.cookieManagementCategory.update({
      where: {
        domainID: {
          equals: domainId,
        },
      },
      data: {
        category: JSON.stringify(category),
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

const deleteCookieManagementCategoryHandler = rest.delete(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/category/:domainId/:categoryName`,
  (req, res, ctx) => {
    const domainId = req.params.domainId as string;
    const categoryName = req.params
      .categoryName as string;

    const domain = db.cookieManagementCategory.findFirst({
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

    const category = JSON.parse(domain.category);
    const newCategory = category.filter(
      (item: Record<string, unknown>) =>
        item.cetegory_name !== categoryName
    );

    db.cookieManagementCategory.update({
      where: {
        domainID: {
          equals: domainId,
        },
      },
      data: {
        category: JSON.stringify(newCategory),
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

const updateCookieManagementCategoryHandler = rest.put(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/category/:domainId/:categoryName`,
  async (req, res, ctx) => {
    const domainId = req.params.domainId as string;
    const categoryName = req.params
      .categoryName as string;

    const requestBody = await req.json();

    const domain = db.cookieManagementCategory.findFirst({
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

    const category = JSON.parse(domain.category);
    const newCategory = category.map(
      (item: Record<string, unknown>) => {
        if (item.cetegory_name === categoryName) {
          return {
            ...item,
            ...requestBody,
          };
        }
        return item;
      }
    );

    db.cookieManagementCategory.update({
      where: {
        domainID: {
          equals: domainId,
        },
      },
      data: {
        category: JSON.stringify(newCategory),
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

const getCookieManagementCategoryHandler = rest.get(
  `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/category/:domainId`,
  (req, res, ctx) => {
    const domainId = req.params.domainId as string;

    const domain = db.cookieManagementCategory.findFirst({
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
          cookies: JSON.parse(domain.cookies),
          category: JSON.parse(domain.category),
        },
      })
    );
  }
);

export const cookieManagementCategoryHandlers = [
  createCookieManagementCategoryHandler,
  deleteCookieManagementCategoryHandler,
  updateCookieManagementCategoryHandler,
  getCookieManagementCategoryHandler,
];
