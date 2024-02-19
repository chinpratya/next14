import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

import { policyManagementAssessmentsQuestionnaireHandlers } from './questionnaire';

const listPolicyManagementAssessmentsHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/assessments`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.policyManagementAssessments.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        ObjectUUID: {
          contains: search,
        },
      },
    });

    const totalRecord =
      db.policyManagementAssessments.count();
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

const createPolicyManagementAssessmentsHandler =
  rest.post(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/assessments`,
    async (req, res, ctx) => {
      const data = await req.json();

      db.policyManagementAssessments.create({
        ...data,
        ObjectUUID: uid(),
        created_dt: new Date().toISOString(),
        created_by: 'Admin',
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

const getPolicyManagementAssessmentsHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/assessments/:assessmentId`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const data = db.policyManagementAssessments.findFirst(
      {
        where: {
          ObjectUUID: {
            equals: assessmentId,
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

const updatePolicyManagementAssessmentsHandler = rest.put(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/assessments/:assessmentId`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;
    const data = await req.json();

    const updatedData =
      db.policyManagementAssessments.update({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
        data: {
          ...data,
          updated_at: new Date().toISOString(),
          updated_by: 'Admin',
        },
      });

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

const deletePolicyManagementAssessmentsHandler =
  rest.delete(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/assessments/:assessmentId`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;

      const data = db.policyManagementAssessments.delete({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
      });

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

const getPolicyManagementAssessmentsDashboardHandler =
  rest.get(
    `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/assessments/:assessmentId/dashboard`,
    async (req, res, ctx) => {
      const data =
        testData.policyManagement.assessments.dashboard;

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

export const policyManagementAssessmentsHandlers = [
  ...policyManagementAssessmentsQuestionnaireHandlers,
  listPolicyManagementAssessmentsHandler,
  createPolicyManagementAssessmentsHandler,
  getPolicyManagementAssessmentsHandler,
  updatePolicyManagementAssessmentsHandler,
  deletePolicyManagementAssessmentsHandler,
  getPolicyManagementAssessmentsDashboardHandler,
];
