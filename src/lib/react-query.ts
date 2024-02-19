import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      onError: console.error,
    },
  },
});

const getQueryKeys = (baseKey: string[]) => {
  return {
    all: [...baseKey],
    many: (params: Record<string, unknown>) => [
      ...baseKey,
      params,
    ],
    one: (id: string) => [...baseKey, id],
  };
};

export const queryKeys = {
  auth: getQueryKeys(['user']),
  siem: {
    incident: getQueryKeys(['siem', 'incident']),
    log: getQueryKeys(['siem', 'incident', 'log']),
    index: getQueryKeys(['siem', 'index']),
    notifications: getQueryKeys([
      'siem',
      'index',
      'notifications',
    ]),
    devices: getQueryKeys(['siem', 'index', 'devices']),
    logsearch: getQueryKeys(['siem', 'logsearch']),
    logFields: getQueryKeys([
      'siem',
      'logsearch',
      'fields',
      'all',
    ]),
    rule: getQueryKeys(['siem', 'rule']),
  },
};
