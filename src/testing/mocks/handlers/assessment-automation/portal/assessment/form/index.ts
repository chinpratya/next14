import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';
import { testData } from '@/testing/test-data';

import { compliancePortalAssessmentFormCommentHandlers } from './comment';

export const getCompliancePortalAssessmentFormHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
          data: testData.compliance.assessment.form,
        })
      );
    }
  );

export const compliancePortalAssessmentFormHandlers = [
  ...compliancePortalAssessmentFormCommentHandlers,
  getCompliancePortalAssessmentFormHandler,
];
