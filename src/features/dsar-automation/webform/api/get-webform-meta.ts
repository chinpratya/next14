import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { WebFormMetaSchema } from '../schemas';
import { WebFormMeta } from '../types';

export const getWebformMeta =
  async (): Promise<WebFormMeta> => {
    const response = await apiClient.get(
      `/webfrom/meta`,
      {
        baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      }
    );

    return WebFormMetaSchema.parse(response.data);
  };

export const useGetWebformMeta = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [dsarAutomationQueryKeys.webform.meta],
      queryFn: () => getWebformMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
