import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { WorkflowResponseSchema } from '../schemas';
import { WorkflowResponse } from '../types';

export const listWorkflow = async (
  params: Request
): Promise<WorkflowResponse> => {
  const response = await apiClient.get(`/workflow`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    params,
  });

  return WorkflowResponseSchema.parse(response);
};

export const useListWorkflow = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.workflow.all,
        params,
      ],
      queryFn: () => listWorkflow(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
