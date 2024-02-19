import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const compliancePortalQueryKeys =
  createQueryKeyStore({
    assessment: {
      all: (status?: string) => [
        'assessment',
        status ?? 'all',
      ],
      detail: (assessmentId: string) => [assessmentId],
      form: (assessmentId: string) => [assessmentId],
      respondents: (assessmentId: string) => [
        assessmentId,
      ],
      respondentDetail: (
        assessmentId: string,
        respondentId: string
      ) => [assessmentId, respondentId],
      ranking: (assessmentId: string, type: string) => [
        assessmentId,
        type,
      ],
      report: (assessmentId: string) => [assessmentId],
      setting: (assessmentId: string) => [assessmentId],
      issue: (assessmentId: string) => [assessmentId],
      comment: (assessmentId: string, formId: string) => [
        assessmentId,
        formId,
      ],
      formCommentUnread: (assessmentId: string) => [
        assessmentId,
      ],
      commentIssue: (
        assessmentId: string,
        formId: string
      ) => [assessmentId, formId, 'issue'],
      commentCount: (
        assessmentId: string,
        formId: string
      ) => [assessmentId, formId, 'count'],
    },
    result: {
      all: null,
      detail: (assessmentId: string) => [assessmentId],
    },
  });
