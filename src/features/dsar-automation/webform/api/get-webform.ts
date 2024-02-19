import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { WebFormDetailSchema } from '../schemas';
import { WebFormDetail } from '../types';

export const getWebform = async (
  webformId: string
): Promise<WebFormDetail> => {
  const { data } = await apiClient.get(
    `/webfrom/${webformId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return WebFormDetailSchema.parse(data);
};

export const useGetWebform = (webformId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.webform.detail(webformId),
      ],
      queryFn: () => getWebform(webformId),
      enabled: !!webformId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
