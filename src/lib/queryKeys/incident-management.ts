import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const incidentManagementQueryKeys =
  createQueryKeyStore({
    workflow: {
      all: null,
      detail: (workflowId: string) => [workflowId],
      task: (workflowId: string) => [workflowId, 'task'],
    },
    sla: {
      all: null,
      detail: (slaId: string) => [slaId],
      details: (slaId: string, serverityId: string) => [
        slaId,
        serverityId,
      ],
    },
    serverity: {
      all: null,
      detail: (slaId: string) => [slaId],
    },
    task: {
      all: null,
    },
    dashboard: {
      count: (duration: string) => [duration],
      detail: (duration: string) => [duration],
      list: (duration: string) => [duration],
    },
    request: {
      all: null,
      detail: (requestID: string, userID: string) => [
        requestID,
        userID,
      ],
    },
    tags: {
      all: null,
      detail: (tagId: string) => [tagId],
    },
    rule: {
      all: null,
      detail: (ruleId: string) => [ruleId],
    },
    operator: {
      all: null,
      detail: (operatorId: string) => [operatorId],
    },
    trigger: {
      all: null,
    },
  });
