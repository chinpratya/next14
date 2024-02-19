import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { TaskVersionResponseSchema } from '../schemas';
import { TaskVersionResponse } from '../types';

export const listTaskVersion = async (
  workId: string
): Promise<TaskVersionResponse> => {
  const res = await apiClient.get(
    `/work/${workId}/version`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return TaskVersionResponseSchema.parse(res);
};

export const useListTaskVersion = (workId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.task.version(workId),
      ],
      queryFn: () => listTaskVersion(workId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
