import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

const listPolicyManagementAssessmentsQuestionnaireHandler =
  rest.get(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams?.get('page') ?? '1';
      const pageSize =
        req.url.searchParams.get('pageSize') ?? '10';
      const search =
        req.url.searchParams.get('search') ?? '';

      const data =
        db.policyManagementAssessmentsQuestionnaire.findMany(
          {
            take: parseInt(pageSize),
            skip:
              (parseInt(page) - 1) * parseInt(pageSize),
            where: {
              ObjectUUID: {
                contains: search,
              },
            },
          }
        );

      const totalRecord =
        db.policyManagementAssessmentsQuestionnaire.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const createPolicyManagementAssessmentsQuestionnaireHandler =
  rest.post(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires`,
    async (req, res, ctx) => {
      const data = await req.json();

      db.policyManagementAssessmentsQuestionnaire.create({
        ...data,
        ObjectUUID: uid(),
        created_dt: new Date().toISOString(),
        created_by: 'Admin',
        status: 'Draft',
      });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const getPolicyManagementAssessmentsQuestionnaireHandler =
  rest.get(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires/:questionnaireId`,
    async (req, res, ctx) => {
      const questionnaireId = req.params
        .questionnaireId as string;

      const data =
        db.policyManagementAssessmentsQuestionnaire.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: questionnaireId,
              },
            },
          }
        );

      if (!data) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'not found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
          data,
        })
      );
    }
  );

const updatePolicyManagementAssessmentsQuestionnaireHandler =
  rest.put(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires/:questionnaireId`,
    async (req, res, ctx) => {
      const questionnaireId = req.params
        .questionnaireId as string;
      const data = await req.json();

      const updatedData =
        db.policyManagementAssessmentsQuestionnaire.update(
          {
            where: {
              ObjectUUID: {
                equals: questionnaireId,
              },
            },
            data: {
              ...data,
              updated_at: new Date().toISOString(),
              updated_by: 'Admin',
            },
          }
        );

      if (!updatedData)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'not found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const deletePolicyManagementAssessmentsQuestionnaireHandler =
  rest.delete(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires/:questionnaireId`,
    async (req, res, ctx) => {
      const questionnaireId = req.params
        .questionnaireId as string;

      const data =
        db.policyManagementAssessmentsQuestionnaire.delete(
          {
            where: {
              ObjectUUID: {
                equals: questionnaireId,
              },
            },
          }
        );

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'not found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const publishPolicyManagementAssessmentsQuestionnaireHandler =
  rest.post(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires/:questionnaireId/publish`,
    (req, res, ctx) => {
      const questionnaireId = req.params
        .questionnaireId as string;

      db.policyManagementAssessmentsQuestionnaire.update({
        where: {
          ObjectUUID: {
            equals: questionnaireId,
          },
        },
        data: {
          status: 'Publish',
          updated_at: new Date().toISOString(),
          updated_by: 'Admin',
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const sendPolicyManagementAssessmentsQuestionnaireHandler =
  rest.post(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires/:questionnaireId/send`,
    (req, res, ctx) => {
      const questionnaireId = req.params
        .questionnaireId as string;

      db.policyManagementAssessmentsQuestionnaire.update({
        where: {
          ObjectUUID: {
            equals: questionnaireId,
          },
        },
        data: {
          is_send: true,
          updated_at: new Date().toISOString(),
          updated_by: 'Admin',
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const listPolicyManagementAssessmentsQuestionnaireVersionHandler =
  rest.get(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/questionnaires/:questionnaireId/version`,
    (req, res, ctx) => {
      const data =
        db.policyManagementAssessmentsQuestionnaireVersion.findMany(
          {}
        );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data,
        })
      );
    }
  );

export const policyManagementAssessmentsQuestionnaireHandlers =
  [
    listPolicyManagementAssessmentsQuestionnaireHandler,
    createPolicyManagementAssessmentsQuestionnaireHandler,
    getPolicyManagementAssessmentsQuestionnaireHandler,
    updatePolicyManagementAssessmentsQuestionnaireHandler,
    deletePolicyManagementAssessmentsQuestionnaireHandler,
    publishPolicyManagementAssessmentsQuestionnaireHandler,
    sendPolicyManagementAssessmentsQuestionnaireHandler,
    listPolicyManagementAssessmentsQuestionnaireVersionHandler,
  ];
