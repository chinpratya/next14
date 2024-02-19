import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const cookieManagementQueryKeys =
  createQueryKeyStore({
    domain: {
      all: null,
      meta: null,
      detail: (domainId: string) => [domainId],
    },
    banner: {
      detail: (domainId: string) => [domainId],
    },
    cookiesCategory: {
      detail: (domainId: string) => [domainId],
    },
    dashboard: {
      detail: (domainId: string) => [domainId],
    },
    scanReport: {
      detail: (domainId: string) => [domainId],
    },
    cookieConsent: {
      all: null,
      meta: null,
    },
  });
