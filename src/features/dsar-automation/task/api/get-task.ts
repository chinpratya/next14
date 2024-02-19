import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { TaskDetailSchema } from '../schemas';
import { TaskDetail } from '../types';

export const getTask = async (
  workId: string
): Promise<TaskDetail> => {
  const { data } = await apiClient.get(
    `/work/${workId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return TaskDetailSchema.parse(data);
};

export const useGetTask = (workId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.task.detail(workId),
      ],
      queryFn: () => getTask(workId),
      enabled: !!workId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
