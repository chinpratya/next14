import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import {
  TaskResponseSchema,
  TaskResponse,
} from '../../task';

export const listRequestTask = async (
  requestId: string,
  stateId: string
): Promise<TaskResponse> => {
  const response = await apiClient.get(
    `/request/${requestId}/subtask/${stateId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return TaskResponseSchema.parse(response);
};

export const useListRequestTask = (
  requestId: string,
  stateId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.task(
          requestId,
          stateId
        ),
      ],
      queryFn: () => listRequestTask(requestId, stateId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
