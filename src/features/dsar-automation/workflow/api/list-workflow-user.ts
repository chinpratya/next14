import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { WorkflowUserResponseSchema } from '../schemas';
import { WorkflowUserResponse } from '../types';

export const listWorkflowUser = async (
  workflowId: string
): Promise<WorkflowUserResponse> => {
  const response = await apiClient.get(
    `/workflow/${workflowId}/users`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return WorkflowUserResponseSchema.parse(response);
};

export const useListWorkflowUser = (
  workflowId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.workflow.users(
          workflowId
        ),
      ],
      queryFn: () => listWorkflowUser(workflowId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
