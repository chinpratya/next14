import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';

import { testData } from '../../../../../test-data';
import { db } from '../../../../db';

import { compliancePortalAssessmentFormHandlers } from './form';

export const listCompliancePortalAssessmentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment`,
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
          : {
              // where: {
              //   status: {
              //     notIn: ['waiting_approve', 'approve'],
              //   }
              // }
            };

      const assessments =
        db.compliancePortalAssessment.findMany(query);

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
          data: assessments.map((item) => ({
            ...item,
            form: undefined,
          })),
        })
      );
    }
  );

const getCompliancePortalAssessmentHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId`,
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
          sendDt: undefined,
          deadlineDt: undefined,
          approveDt: undefined,
          form: JSON.parse(assessment.form),
        },
      })
    );
  }
);

const updateAssessmentCompliancePortalHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/save`,
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
      })
    );
  }
);

const submittedAssessmentCompliancePortalHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/submit`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
        })
      );
    }
  );

const sendUpdateAssessmentCompliancePortalHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment-approve/:assessmentId/send-update`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
        })
      );
    }
  );

const getCompliancePortalAssessmentRespondentsHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/respondent`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;
      const list =
        testData.compliance.portal.listAssessors;
      if (!assessmentId) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            code: 400,
            message: 'Bad request',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
          data: list,
        })
      );
    }
  );

const getCompliancePortalAssessmentRakingHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/ranking`,
    async (req, res, ctx) => {
      const type = req.url.searchParams.get(
        'type'
      ) as string;

      const { data, meta } =
        testData.compliance.portal.ranking;

      if (type === 'department') {
        return res(
          ctx.status(200),
          ctx.delay(1000),
          ctx.json({
            code: 200,
            message: 'Success',
            data,
            meta,
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
            scores: [data.scores[0]],
            avgHorizontal: data.avgHorizontal,
          },
          meta,
        })
      );
    }
  );

export const compliancePortalAssessmentHandlers = [
  ...compliancePortalAssessmentFormHandlers,
  listCompliancePortalAssessmentHandler,
  getCompliancePortalAssessmentHandler,
  updateAssessmentCompliancePortalHandler,
  submittedAssessmentCompliancePortalHandler,
  getCompliancePortalAssessmentRespondentsHandler,
  getCompliancePortalAssessmentRakingHandler,
  sendUpdateAssessmentCompliancePortalHandler,
];
