import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';
import { uid } from '@/utils';

import { db } from '../../db';

const listComplianceAssessmentSubmissionHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission`,
    async (req, res, ctx) => {
      const search =
        req.url.searchParams.get('search') || '';
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceAssessmentSubmission.findMany({
          where: {
            name: {
              contains: search,
            },
          },
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          // orderBy: {
          //   createdDt: 'desc',
          // },
        });

      const totalRecord =
        db.complianceAssessmentSubmission.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceAssessmentSubmissionHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const data =
      db.complianceAssessmentSubmissionInfo.findFirst({
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
          message: 'Not Found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
        data,
      })
    );
  }
);

const getComplianceAssessmentSubmissionSettingHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/setting`,
    async (req, res, ctx) => {
      const assessmentId = req.params
        .assessmentId as string;

      const data =
        db.complianceAssessmentSubmissionSetting.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: assessmentId,
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
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
        })
      );
    }
  );

const getComplianceAssessmentSubmissionRespondentAllHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/all-organization`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
          data: testData.compliance.assessmentSubmission
            .allRespondents,
        })
      );
    }
  );

const listComplianceAssessmentSubmissionRespondentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/respondent`,
    async (req, res, ctx) => {
      const data =
        db.complianceAssessmentSubmissionRespondent.findMany(
          {}
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentPage: 1,
          totalPage: data.length,
          currentRecord: data.length,
          totalRecord: data.length,
        })
      );
    }
  );

const getComplianceAssessmentSubmissionRespondentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/respondent/:respondentId`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;

      const data =
        db.complianceAssessmentSubmissionRespondent.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: respondentId,
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
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
        })
      );
    }
  );

const deleteComplianceAssessmentSubmissionRespondentHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/respondent/:respondentId`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;

      const data =
        db.complianceAssessmentSubmissionRespondent.delete(
          {
            where: {
              ObjectUUID: {
                equals: respondentId,
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
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const getComplianceAssessmentSubmissionRespondentLogHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/respondent/:respondentId/log`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;

      const data =
        db.complianceAssessmentSubmissionRespondentLog.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: respondentId,
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
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
        })
      );
    }
  );

const createComplianceAssessmentSubmissionRespondentAddRespondentHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/respondent`,
    async (req, res, ctx) => {
      const data = await req.json();

      const newData =
        db.complianceAssessmentSubmissionRespondentAddRespondent.create(
          {
            ...data,
          }
        );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json(newData)
      );
    }
  );

const complianceAssessmentSubmissionRespondentExtendTimeHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/respondent/:respondentId/extend-time`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;

      db.complianceAssessmentSubmissionRespondentExtendTime.update(
        {
          where: {
            ObjectUUID: {
              equals: respondentId,
            },
          },
          data: {
            isExtendTime: true,
          },
        }
      );

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

const createComplianceAssessmentSubmissionRespondentChangeApproverHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/change-approver`,
    async (req, res, ctx) => {
      const data = await req.json();

      const newData =
        db.complianceAssessmentSubmissionRespondentChangeApprover.create(
          {
            ...data,
          }
        );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json(newData)
      );
    }
  );

const getComplianceAssessmentSubmissionSettingsHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/setting`,
    async (req, res, ctx) => {
      const data =
        db.complianceAssessmentSubmissionSetting.findFirst(
          { where: {} }
        );

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data: data,
        })
      );
    }
  );

export const getComplianceAssessmentSubmissionRakingHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/ranking`,
    async (req, res, ctx) => {
      const type = req.url.searchParams.get(
        'type'
      ) as string;

      const { data, meta } =
        testData.compliance.assessmentSubmission.ranking;

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

const getComplianceAssessmentSubmissionReportHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/report`,
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

      const report =
        testData.compliance.assessmentSubmission.report;

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

const createComplianceAssessmentSubmissionHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission`,
    async (req, res, ctx) => {
      const data = await req.json();

      const newData =
        db.complianceAssessmentSubmission.create({
          ...data,
          ObjectUUID: uid(),
          group: 'ความพร้อม',
          assessmentName: 'หลงกลเธอแล้วทำไงได้',
          status: 'waiting_send',
          dueDate: '2023-04-30 10:00',
        });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'Success',
          ObjectUUID: newData.ObjectUUID,
        })
      );
    }
  );

const publishComplianceAssessmentSubmissionHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assignmentSubmissionID/publish`,
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

const updateComplianceAssessmentSubmissionSettingDateHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/setting/date`,
    async (req, res, ctx) => {
      const data = await req.json();

      db.complianceAssessmentSubmissionSetting.update({
        where: {
          ObjectUUID: {
            equals: '1',
          },
        },
        data: {
          ...data,
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const updateComplianceAssessmentSubmissionSettingNotificationHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/setting/notification`,
    async (req, res, ctx) => {
      const data = await req.json();

      db.complianceAssessmentSubmissionSetting.update({
        where: {
          ObjectUUID: {
            equals: '1',
          },
        },
        data: {
          ...data,
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const updateComplianceAssessmentSubmissionSettingScheduleHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/setting/schedule`,
    async (req, res, ctx) => {
      const data = await req.json();

      db.complianceAssessmentSubmissionSetting.update({
        where: {
          ObjectUUID: {
            equals: '1',
          },
        },
        data: {
          ...data,
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceAssessmentSubmissionOrganizationRespondentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assignment-submission/:assessmentId/org-respondent`,
    async (req, res, ctx) => {
      const data =
        db.complianceAssessmentSubmissionOrganizationRespondent.findMany(
          {}
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentPage: 1,
          totalPage: data.length,
          currentRecord: data.length,
          totalRecord: data.length,
        })
      );
    }
  );

export const complianceAssessmentSubmissionHandlers = [
  listComplianceAssessmentSubmissionHandler,
  getComplianceAssessmentSubmissionHandler,
  createComplianceAssessmentSubmissionHandler,
  publishComplianceAssessmentSubmissionHandler,
  getComplianceAssessmentSubmissionRespondentAllHandler,
  listComplianceAssessmentSubmissionRespondentHandler,
  getComplianceAssessmentSubmissionRespondentHandler,
  deleteComplianceAssessmentSubmissionRespondentHandler,
  getComplianceAssessmentSubmissionRespondentLogHandler,
  createComplianceAssessmentSubmissionRespondentAddRespondentHandler,
  complianceAssessmentSubmissionRespondentExtendTimeHandler,
  createComplianceAssessmentSubmissionRespondentChangeApproverHandler,
  getComplianceAssessmentSubmissionSettingsHandler,
  getComplianceAssessmentSubmissionRakingHandler,
  getComplianceAssessmentSubmissionReportHandler,
  createComplianceAssessmentSubmissionHandler,
  publishComplianceAssessmentSubmissionHandler,
  updateComplianceAssessmentSubmissionSettingDateHandler,
  updateComplianceAssessmentSubmissionSettingNotificationHandler,
  updateComplianceAssessmentSubmissionSettingScheduleHandler,
  getComplianceAssessmentSubmissionSettingHandler,
  listComplianceAssessmentSubmissionOrganizationRespondentHandler,
];
