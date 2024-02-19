import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const coreQueryKeys = createQueryKeyStore({
  reportTablesDashboard: {
    all: null,
  },
  reportChartsDashboard: {
    all: null,
  },
  reportWidgetsDashboard: {
    all: null,
  },
  reportScheduler: {
    all: (module: string) => [module],
  },
  reportDownload: {
    all: (module: string) => [module],
  },
  notify: {
    all: null,
    detail: (notifyId: string) => [notifyId],
  },
  notifyList: {
    all: null,
  },
  report: {
    all: null,
  },
  tenantStatus: {
    detail: null,
  },
  tenantStorage: {
    all: null,
    remaining: null,
  },
});
