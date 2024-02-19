import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { RequestTaskResponseSchema } from '../schemas';
import { RequestTaskResponse } from '../types';

export const listRequestTask = async (
  requestId: string,
  stateId: string
): Promise<RequestTaskResponse> => {
  const response = await apiClient.get(
    `/request/${requestId}/subtask/${stateId}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return RequestTaskResponseSchema.parse(response);
};

export const useListRequestTask = (
  requestId: string,
  stateId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.request.task(
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
