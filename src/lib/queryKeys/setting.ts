import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const settingQueryKeys = createQueryKeyStore({
  organization: {
    all: null,
    branch: null,
  },
});
