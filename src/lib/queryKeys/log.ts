import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const logQueryKeys = createQueryKeyStore({
  indices: {
    all: null,
    storageSize: null,
    detail: (indiceId: string) => [indiceId],
  },
  indicesHost: {
    all: (indiceId: string) => [indiceId],
  },
  searchFields: {
    all: (indiceId: string, module: string) => [
      indiceId,
      module,
    ],
  },
  searchIndices: {
    all: (module: string) => [module],
  },
  searchHost: {
    all: (indiceId: string, module: string) => [
      indiceId,
      module,
    ],
  },
  searchList: {
    all: null,
  },
  monitor: {
    all: (
      indiceId: string,
      page: number,
      pageSize: number
    ) => [indiceId, page, pageSize],
    detail: (monitorId: string) => [monitorId],
  },
  monitorHosts: {
    all: (indiceId: string) => [indiceId],
  },
  directory: {
    all: (path: string) => [path],
    detail: (fileId: string) => [fileId],
    read: (fileId: string) => [fileId],
  },
  archive: {
    all: null,
  },
  backup: {
    all: null,
    activity: null,
    detail: (backupId: string) => [backupId],
  },
  setting: {
    detail: null,
    stratum: null,
  },
  whitelist: {
    all: null,
    detail: (whitelistId: string) => [whitelistId],
  },
  forwarding: {
    all: null,
    detail: (forwardingId: string) => [forwardingId],
  },
  hostname: {
    host: null,
  },
  download: {
    all: null,
  },
});
