import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const profileQueryKeys = createQueryKeyStore({
  meta: {
    all: null,
  },
  profile: {
    all: null,
  },
  session: {
    all: null,
  },
  role: {
    all: null,
  },
  userGroup: {
    all: null,
  },
});
