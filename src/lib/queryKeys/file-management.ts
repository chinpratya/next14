import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const fileManagementQueryKeys =
  createQueryKeyStore({
    file: {
      list: (
        module: string,
        group: string,
        env: 'private' | 'public'
      ) => [module, group, env],
    },
  });
