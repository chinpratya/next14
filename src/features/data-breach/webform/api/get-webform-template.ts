import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { WebformTemplateSchema } from '../schemas';
import { WebformTemplate } from '../types';

export const getWebformTemplate = async (
  webformId: string
): Promise<WebformTemplate> => {
  const response = await apiClient.get(
    `/webfrom/template/${webformId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return WebformTemplateSchema.parse(response.data);
};

export const useGetWebformTemplate = (
  webformId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.webform.template(webformId),
      ],
      queryFn: () => getWebformTemplate(webformId),
      enabled: !!webformId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
