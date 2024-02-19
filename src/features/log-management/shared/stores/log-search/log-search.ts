import dayjs from 'dayjs';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

import {
  LogSearchField,
  LogSearchPayload,
  LogSearchRefetch,
} from '@/features/log-management';

type LogSearchStore = {
  data: LogSearchPayload;
  field: LogSearchField;
  refetch: LogSearchRefetch;
  isLoading: boolean;
  isError: boolean;
  isEnabled: boolean;
  onSetData: (data: LogSearchPayload) => void;
  onSetField: (field: LogSearchField) => void;
  onSetError: (value: boolean) => void;
  onSetLoading: (value: boolean) => void;
  onSetEnabled: (value: boolean) => void;
  handleRefetch: (key: string) => void;
  onSetRefetch: (value: LogSearchRefetch) => void;
  onSetCustomDate: () => void;
  onReset: () => void;
};

const initialState = {
  hostname: [],
  type: 'all',
  timestamp: [dayjs().add(-15, 'minutes'), dayjs()],
  page: 1,
  limit: 10,
} as LogSearchPayload;

const initialField = {
  list: [],
  default: [],
  selected: ['@timestamp', 'message'],
  search: '',
  checkedAll: false,
};

const initialRefetchState: LogSearchRefetch = {
  disabled: true,
  refetchTime: 0,
  label: {
    key: 'logManagement.dashboard.disable',
  },
  isRefetch: false,
  loading: false,
  isCustomDate: false,
};

export const logSearchStore = createStore<LogSearchStore>(
  (set, get) => ({
    data: initialState,
    field: initialField,
    refetch: initialRefetchState,
    isLoading: false,
    isError: false,
    isEnabled: false,
    onSetData: (data) =>
      set({
        data: { indices: get().data.indices, ...data },
      }),
    onSetField: (field) => set({ field }),
    onSetLoading: (isLoading: boolean) =>
      set({ isLoading }),
    onSetError: (isError: boolean) => set({ isError }),
    onSetEnabled: (isEnabled: boolean) =>
      set({ isEnabled }),
    onReset: () =>
      set({
        isEnabled: false,
        isError: false,
        isLoading: false,
        data: initialState,
        field: initialField,
        refetch: initialRefetchState,
      }),
    handleRefetch: (key) => {
      let state = {};

      switch (key) {
        case 'refresh':
          state = { isRefetch: true };

          const [from] = get().data.timestamp;
          set({
            data: {
              ...get().data,
              timestamp: [from, dayjs()],
            },
          });

          break;
        case 'disable':
          state = {
            disabled: true,
            label: {
              key: 'logManagement.dashboard.disable',
            },
          };
          break;
        case '10 seconds':
          state = {
            disabled: false,
            refetchTime: 10000,
            label: {
              key: 'logManagement.logSearch.seconds',
              value: '10',
            },
          };
          break;
        case '30 seconds':
          state = {
            disabled: false,
            refetchTime: 30000,
            label: {
              key: 'logManagement.logSearch.seconds',
              value: '30',
            },
          };
          break;
        case '1 minute':
          state = {
            disabled: false,
            refetchTime: 60000,
            label: {
              key: 'logManagement.logSearch.minute',
              value: '1',
            },
          };
          break;
        case '1 hour':
          state = {
            disabled: false,
            refetchTime: 3600000,
            label: {
              key: 'logManagement.logSearch.hour',
              value: '1',
            },
          };
          break;
        default:
          break;
      }

      set({
        refetch: { ...get().refetch, ...state },
      });
    },
    onSetRefetch: (value) => set({ refetch: value }),
    onSetCustomDate: () => {
      set({
        refetch: {
          ...initialRefetchState,
          isCustomDate: true,
        },
      });
    },
  })
);

export const useLogSearchStore = () =>
  useStore(logSearchStore);
