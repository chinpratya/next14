import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { TaskResponseSchema } from '../schemas';
import { TaskResponse } from '../types';

type ListTask = Request & {
  approve: string;
};
export const listTask = async ({
  approve,
  ...params
}: ListTask): Promise<TaskResponse> => {
  const response = await apiClient.get(`/work`, {
    baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    params: {
      approve,
      ...params,
    },
  });

  return TaskResponseSchema.parse(response);
};
export const useListTask = ({
  approve,
  ...params
}: ListTask) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.task.all,
        { ...params, approve },
      ],
      keepPreviousData: true,
      queryFn: () => listTask({ ...params, approve }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
