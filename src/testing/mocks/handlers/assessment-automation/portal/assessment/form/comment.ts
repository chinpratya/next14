import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../../../../db';

const listCompliancePortalAssessmentFormCommentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;
      const formId = req.params.formId as string;

      if (!assessmentId || !formId) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not found',
          })
        );
      }

      const comments =
        db.compliancePortalAssessmentFormComment.findMany(
          {}
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'Success',
          data: comments.map((comment) => ({
            ...comment,
            isApprove: undefined,
            isRead: undefined,
          })),
        })
      );
    }
  );

const createCompliancePortalAssessmentFormCommentHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;
      const formId = req.params.formId as string;

      const { message } = await req.json();

      if (!assessmentId || !formId || !message) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 500,
            message: 'Can`t create comment',
          })
        );
      }

      db.compliancePortalAssessmentFormComment.create({
        message,
        createdDt: new Date().toISOString(),
        createdBy: 'testuser2',
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

const updateCompliancePortalAssessmentFormCommentHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment/:commentId`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;
      const formId = req.params.formId as string;
      const commentId = req.params.commentId as string;

      const { message } = await req.json();

      if (
        !assessmentId ||
        !formId ||
        !commentId ||
        !message
      ) {
        return res(
          ctx.status(500),
          ctx.delay(3000),
          ctx.json({
            code: 500,
            message: 'Can`t update comment',
          })
        );
      }

      db.compliancePortalAssessmentFormComment.update({
        where: {
          ObjectUUID: {
            equals: commentId,
          },
        },
        data: {
          message,
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

const deleteCompliancePortalAssessmentFormCommentHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment/:commentId`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;
      const formId = req.params.formId as string;
      const commentId = req.params.commentId as string;

      if (!assessmentId || !formId || !commentId) {
        return res(
          ctx.status(500),
          ctx.delay(3000),
          ctx.json({
            code: 500,
            message: 'Can`t delete comment',
          })
        );
      }

      db.compliancePortalAssessmentFormComment.delete({
        where: {
          ObjectUUID: {
            equals: commentId,
          },
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

const resolveCompliancePortalAssessmentFormCommentHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment/:commentId/resolve`,
    async (req, res, ctx) => {
      const commentId = req.params.commentId as string;

      const comment =
        db.compliancePortalAssessmentFormComment.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: commentId,
              },
            },
          }
        );

      if (!comment) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not found',
          })
        );
      }

      db.compliancePortalAssessmentFormComment.update({
        where: {
          ObjectUUID: {
            equals: commentId,
          },
        },
        data: {
          isApprove: true,
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

const countCompliancePortalAssessmentFormUnreadCommentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment-count`,
    async (req, res, ctx) => {
      const comments =
        db.compliancePortalAssessmentFormComment.findMany(
          {
            where: {
              isRead: {
                equals: false,
              },
            },
          }
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'Success',
          data: {
            count: comments.length,
          },
        })
      );
    }
  );

const readCompliancePortalAssessmentFormCommentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/comment-read`,
    async (req, res, ctx) => {
      db.compliancePortalAssessmentFormComment.updateMany(
        {
          where: {
            isRead: {
              equals: false,
            },
          },
          data: {
            isRead: true,
          },
        }
      );

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

export const getCompliancePortalAssessmentFormCommentIssueHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/issue`,
    (req, res, ctx) => {
      const formId = req.params.formId as string;

      const issue =
        db.compliancePortalAssessmentFormCommentIssue.findFirst(
          {
            where: {
              formId: {
                equals: formId,
              },
            },
          }
        );

      if (!issue) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'Success',
          ...issue,
          formId: undefined,
        })
      );
    }
  );

export const resolveCompliancePortalAssessmentFormCommentIssueHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/issue/resolve`,
    (req, res, ctx) => {
      const formId = req.params.formId as string;
      db.compliancePortalAssessmentFormCommentIssue.update(
        {
          where: {
            formId: {
              equals: formId,
            },
          },
          data: {
            haveIssue: false,
            status: 'approved',
          },
        }
      );

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

export const rejectCompliancePortalAssessmentFormCommentIssueHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/portal/assessment/:assessmentId/form/:formId/issue/reject`,
    (req, res, ctx) => {
      const formId = req.params.formId as string;
      db.compliancePortalAssessmentFormCommentIssue.update(
        {
          where: {
            formId: {
              equals: formId,
            },
          },
          data: {
            haveIssue: false,
            status: 'issue',
          },
        }
      );

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

export const compliancePortalAssessmentFormCommentHandlers =
  [
    listCompliancePortalAssessmentFormCommentHandler,
    createCompliancePortalAssessmentFormCommentHandler,
    updateCompliancePortalAssessmentFormCommentHandler,
    deleteCompliancePortalAssessmentFormCommentHandler,
    resolveCompliancePortalAssessmentFormCommentHandler,
    countCompliancePortalAssessmentFormUnreadCommentHandler,
    readCompliancePortalAssessmentFormCommentHandler,
    getCompliancePortalAssessmentFormCommentIssueHandler,
    resolveCompliancePortalAssessmentFormCommentIssueHandler,
    rejectCompliancePortalAssessmentFormCommentIssueHandler,
  ];
