import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { WorkflowMetaSchema } from '../schemas';
import { WorkflowMeta } from '../types';

export const getWorkflowMeta =
  async (): Promise<WorkflowMeta> => {
    const { data } = await apiClient.get(
      `/workflow/meta`,
      {
        baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      }
    );

    return WorkflowMetaSchema.parse(data);
  };

export const useGetWorkflowMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [dsarAutomationQueryKeys.workflow.meta],
      queryFn: () => getWorkflowMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
