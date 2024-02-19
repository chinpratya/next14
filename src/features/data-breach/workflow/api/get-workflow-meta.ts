import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { WorkflowMetaSchema } from '../schemas';
import { WorkflowMeta } from '../types';

export const getWorkflowMeta =
  async (): Promise<WorkflowMeta> => {
    const { data } = await apiClient.get(
      `/workflow/meta`,
      {
        baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      }
    );

    return WorkflowMetaSchema.parse(data);
  };

export const useGetWorkflowMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [dataBreachQueryKeys.workflow.meta],
      queryFn: () => getWorkflowMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
