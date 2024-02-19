import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const dataBreachQueryKeys = createQueryKeyStore({
  request: {
    all: null,
    meta: null,
    filter: null,
    detail: (requestId: string) => [requestId],
    version: (requestId: string) => [requestId],
    form: (requestId: string) => [requestId],
    task: (requestId: string, stateId: string) => [
      requestId,
      stateId,
    ],
    verification: (requestId: string) => [requestId],
    verificationDetail: (
      requestId: string,
      identifyId?: string
    ) => [requestId, identifyId],
    assessment: (requestId: string) => [requestId],
    incidentTemplate: (requestId: string) => [requestId],
  },
  task: {
    all: null,
    meta: null,
    detail: (workId: string) => [workId],
    version: (workId: string) => [workId],
    assessment: (workId: string) => [workId],
  },
  webform: {
    all: null,
    meta: null,
    detail: (webformId: string) => [webformId],
    version: (webformId: string) => [webformId],
    activity: (webformId: string) => [webformId],
    user: (webformId: string) => [webformId],
    versionDetail: (
      webformId: string,
      versionId: string
    ) => [webformId, versionId],
    template: (webformId: string) => [webformId],
    languages: (webformId: string) => [webformId],
    language: (webformId: string, languageId: string) => [
      webformId,
      languageId,
    ],
    eventTemplate: null,
  },
  workflow: {
    all: null,
    meta: null,
    users: (webformId: string) => [webformId],
    detail: (workflowId: string) => [workflowId],
    tasks: (workflowId: string, stateId: string) => [
      workflowId,
      stateId,
    ],
    taskDetail: (
      workflowId: string,
      stateId: string,
      taskId?: string
    ) => [workflowId, stateId, taskId],
    version: (workflowId: string) => [workflowId],
    testApi: (workflowId: string) => [workflowId],
  },
  tags: {
    all: null,
    detail: (tagId: string) => [tagId],
  },
  riskMatrix: {
    all: null,
    detail: (riskMatrixId: string) => [riskMatrixId],
    chance: (riskMatrixId: string) => [riskMatrixId],
    effect: (riskMatrixId: string) => [riskMatrixId],
    score: (riskMatrixId: string) => [riskMatrixId],
  },
  incidentTemplate: {
    all: null,
    detail: (incidentTemplateId: string) => [
      incidentTemplateId,
    ],
    eventForm: (incidentTemplateId: string) => [
      incidentTemplateId,
    ],
  },
  dashboard: {
    count: null,
    bytime: null,
    typeofrequest: null,
    task: null,
    request: null,
    webform: null,
    subjectType: null,
  },
});
