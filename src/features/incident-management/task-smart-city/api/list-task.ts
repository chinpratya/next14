import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
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
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    params: {
      approve,
      ...params,
    },
  });

  return TaskResponseSchema.parse(response);
};
type UseListTask = ListTask;
export const useListTask = ({
  approve,
  ...params
}: UseListTask) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.task.all,
        { ...params, approve },
      ],
      queryFn: () => listTask({ ...params, approve }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
