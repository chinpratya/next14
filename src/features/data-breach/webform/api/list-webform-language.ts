import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { WebFormLanguageListSchema } from '../schemas';
import { WebFormLanguageList } from '../types';

export const listWebformLanguage = async (
  webformId: string
): Promise<WebFormLanguageList[]> => {
  const response = await apiClient.get(
    `/webfrom/language/${webformId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return z
    .array(WebFormLanguageListSchema)
    .parse(response.data);
};

export const useListWebformLanguage = (
  webformId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.webform.languages(webformId),
      ],
      queryFn: () => listWebformLanguage(webformId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
