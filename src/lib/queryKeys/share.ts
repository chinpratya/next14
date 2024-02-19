import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const shareQueryKeys = createQueryKeyStore({
  optionTypeData: {
    all: (type: string) => [type],
  },
  country: {
    all: null,
  },
  comment: {
    all: (
      module: string,
      submodule: string,
      pageidorname: string
    ) => [module, submodule, pageidorname],
  },
});
