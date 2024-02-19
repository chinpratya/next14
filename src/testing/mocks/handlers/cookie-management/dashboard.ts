import { rest } from 'msw';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../db';

const getCookieManagementDashboardSummaryHandler =
  rest.get(
    `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/dashboard/:domainId/summary`,
    async (req, res, ctx) => {
      const domainId = req.params.domainId as string;

      const domain = db.cookieManagementDomain.findFirst({
        where: {
          domainID: {
            equals: domainId,
          },
        },
      });

      const category =
        db.cookieManagementCategory.findFirst({
          where: {
            domainID: {
              equals: domainId,
            },
          },
        });

      if (!domain || !category) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            code: 404,
            message: 'not found',
          })
        );
      }

      const accept = {
        acceptAll: Math.floor(Math.random() * 100),
        customization: Math.floor(Math.random() * 100),
      };

      const getCategory = () => {
        const cookies = JSON.parse(category.cookies);
        const categories = JSON.parse(category.category);
        return categories.map(
          (category: {
            cetegory_name: string;
            cetegory_label: string;
          }) => ({
            categoryName: category.cetegory_label,
            count: cookies.filter(
              (cookie: { category: string }) =>
                cookie.category === category.cetegory_name
            ).length,
          })
        );
      };

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: {
            accept,
            category: getCategory(),
          },
        })
      );
    }
  );

const getCookieManagementDashboardReportHandler =
  rest.get(
    `${API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL}/dashboard/:domainId/detail`,
    async (req, res, ctx) => {
      const domainId = req.params.domainId as string;

      const domain = db.cookieManagementDomain.findFirst({
        where: {
          domainID: {
            equals: domainId,
          },
        },
      });

      const category =
        db.cookieManagementCategory.findFirst({
          where: {
            domainID: {
              equals: domainId,
            },
          },
        });

      if (!domain || !category) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            code: 404,
            message: 'not found',
          })
        );
      }

      const cookies = JSON.parse(category.cookies);
      const categories = JSON.parse(category.category);

      const getCategory = () => {
        return categories.map(
          (category: {
            cetegory_name: string;
            cetegory_label: string;
          }) => ({
            categoryName: category.cetegory_label,
            count: cookies.filter(
              (cookie: { category: string }) =>
                cookie.category === category.cetegory_name
            ).length,
          })
        );
      };

      const getTypePerson = () => {
        return {
          FirstPerson: cookies.filter(
            (cookie: { domains: string }) =>
              cookie.domains === domain.site
          ).length,
          ThirdPerson: cookies.filter(
            (cookie: { domains: string }) =>
              cookie.domains !== domain.site
          ).length,
        };
      };

      const getExpiration = () => {
        return {
          moreyear: cookies.filter(
            (cookie: { Expiry: string }) =>
              new Date(cookie.Expiry) >
              new Date(Date.now() + 31536000000)
          ).length,
          lessyear: cookies.filter(
            (cookie: { Expiry: string }) =>
              new Date(cookie.Expiry) <
              new Date(Date.now() + 31536000000)
          ).length,
        };
      };

      const getClassified = () => {
        return {
          classified: cookies.filter(
            (cookie: { category: string }) =>
              cookie.category !== 'unclassified'
          ).length,
          unclassified: cookies.filter(
            (cookie: { category: string }) =>
              cookie.category === 'unclassified'
          ).length,
        };
      };

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: {
            categories: getCategory(),
            typePerson: getTypePerson(),
            Expiration: getExpiration(),
            Classified: getClassified(),
          },
        })
      );
    }
  );

export const cookieManagementDashboardHandlers = [
  getCookieManagementDashboardSummaryHandler,
  getCookieManagementDashboardReportHandler,
];
