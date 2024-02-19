import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const siemQueryKeys = createQueryKeyStore({
  rule: {
    all: null,
    detail: (ruleId: string) => [ruleId],
    indices: (indiceId: string) => [indiceId],
  },
  incident: {
    all: (
      search: string,
      page: number,
      pageSize: number,
      filter: Record<string, unknown>
    ) => [search, page, pageSize, filter],
    detail: (incidentId: string) => [incidentId],
  },
});
