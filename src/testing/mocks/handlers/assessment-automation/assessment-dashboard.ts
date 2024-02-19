import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

const getComplianceAssessmentDashboardHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/dashboard`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
        data: testData.compliance.assessmentDashboard
          .dataDashboard,
      })
    );
  }
);

const getComplianceAssessmentDashboardMetaHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/dashboard-meta`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data: testData.compliance.assessmentDashboard
            .dashboardMeta,
        })
      );
    }
  );

export const complianceAssessmentDashBoardHandlers = [
  getComplianceAssessmentDashboardHandler,
  getComplianceAssessmentDashboardMetaHandler,
];
