import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../../../db';

const listCompliancePortalAssessmentHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment-approve`,
  async (req, res, ctx) => {
    const status = req.url.searchParams.get(
      'status'
    ) as string;

    const query =
      status === 'waiting_approve,approve'
        ? {
            where: {
              status: {
                in: ['waiting_approve', 'approve'],
              },
            },
          }
        : {};

    const assessments =
      db.compliancePortalAssessment.findMany(query);

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'Success',
        data: assessments.map((assessment) => ({
          ...assessment,
          form: undefined,
        })),
      })
    );
  }
);

const getCompliancePortalAssessmentHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment-approve/:assessmentId`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const assessment =
      db.compliancePortalAssessment.findFirst({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
      });

    if (!assessment) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'Not found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'Success',
        data: {
          ...assessment,
          form: JSON.parse(assessment.form),
        },
      })
    );
  }
);

const approvedCompliancePortalAssessmentHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment-approve/:assessmentId/approve`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;

      db.compliancePortalAssessment.update({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
        data: {
          status: 'approve',
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'Success',
        })
      );
    }
  );

const rejectedCompliancePortalAssessmentHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment-approve/:assessmentId/reject`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;

      const payload = await req.json();

      if (!payload.reason) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            code: 400,
            message: 'Reason is required',
          })
        );
      }

      db.compliancePortalAssessment.update({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
        data: {
          status: 'reject',
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'Success',
        })
      );
    }
  );

export const compliancePortalAssessmentApproveHandlers = [
  listCompliancePortalAssessmentHandler,
  getCompliancePortalAssessmentHandler,
  approvedCompliancePortalAssessmentHandler,
  rejectedCompliancePortalAssessmentHandler,
];
