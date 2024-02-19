import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { OptionResponseSchema } from '../schemas';
import { Option } from '../types';

export const listIndice = async (): Promise<Option[]> => {
  const { data } = await apiClient.get(
    `/log/indices?module=SIEM&response_type=lists&page_size=100`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return OptionResponseSchema.parse(data);
};

export const useListIndice = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listIndice(),
      queryKey: [logQueryKeys.indices.all],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
