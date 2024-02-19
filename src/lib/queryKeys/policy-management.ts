import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const policyManagementQueryKeys =
  createQueryKeyStore({
    dashboard: {
      all: null,
    },
    policy: {
      all: null,
      template: null,
      templateID: (templateId?: string | undefined) => [
        templateId ?? '',
      ],
      customizeTemplate: (
        templateId?: string | undefined
      ) => [templateId ?? ''],
      languageMeta: null,
      user: (policyId: string) => [policyId],
      detail: (policyId: string) => [policyId],
      preview: (policyId: string) => [policyId],
      language: (policyId: string) => [policyId],
      languageDetail: (
        policyId: string,
        language: string
      ) => [policyId, language],
      version: (policyId: string) => [policyId],
      versionDetail: (
        policyId: string,
        versionId: string
      ) => [policyId, versionId],
      versionPreview: (
        policyId: string,
        versionId: string
      ) => [policyId, versionId],
    },
    tasks: {
      all: null,
      detail: (taskId: string) => [taskId],
    },
    assessments: {
      all: null,
      detail: (assessmentId: string) => [assessmentId],
      dashboard: (assessmentId: string) => [assessmentId],
      questionnaire: null,
      questionnaireDetail: (questionnaireId: string) => [
        questionnaireId,
      ],
      questionnaireVersion: (questionnaireId: string) => [
        questionnaireId,
      ],
    },
  });
