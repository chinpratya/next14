import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const auditLogQueryKeys = createQueryKeyStore({
  historySystem: {
    all: (
      search: string,
      page: number,
      pageSize: number
    ) => [search, page, pageSize],
  },
});
