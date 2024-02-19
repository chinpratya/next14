import { rest } from 'msw';

import { API_ENDPOINT_ONEFENCE_BASE_URL } from '@/config/endpoint';

// import { testData } from '../../../../../test-data/index';
import { db } from '../../../../db';

const getListAuditLog = rest.get(
  `${API_ENDPOINT_ONEFENCE_BASE_URL}/log/event`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pages_ize') || '10';

    const data = db.organizationAuditLog.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        createdDt: 'desc',
      },
    });
    // const data =
    //   testData.organization.user.org.audit.listAudit;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data,
        totalRecord: 1000,
        currentRecord: parseInt(page),
        totalPage: 1000,
        currentPage: parseInt(page),
      })
    );
  }
);

export const OrganizationAdminLogHandlers = [
  getListAuditLog,
];
