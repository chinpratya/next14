import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';

import { testData } from '../../../../test-data';

const getCompliancePortalReportHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/report`,
  (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    if (!assessmentId) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'Not found',
        })
      );
    }

    const report = testData.compliance.portal.report;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'Success',
        data: report,
      })
    );
  }
);

export const reportCompliancePortalHandlers = [
  getCompliancePortalReportHandler,
];
