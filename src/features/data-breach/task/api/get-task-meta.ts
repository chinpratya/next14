import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { TaskMetaSchema } from '../schemas';
import { TaskMeta } from '../types';

export const getTaskMeta =
  async (): Promise<TaskMeta> => {
    const response = await apiClient.get(`/work/meta`, {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    });

    return TaskMetaSchema.parse(response.data);
  };

export const useGetTaskMeta = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [dataBreachQueryKeys.task.meta],
      queryFn: () => getTaskMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
