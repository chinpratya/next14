import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { OptionResponseSchema } from '../schemas';
import { Option } from '../types';

type ListIndice = Request;

export const listIndice = async ({
  page = 1,
  pageSize = 10,
}: ListIndice): Promise<Option[]> => {
  const { data } = await apiClient.get(
    `/log/indices?module=LM&response_type=lists&page=${page}&page_size=${pageSize}`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return OptionResponseSchema.parse(data);
};

type UseListIndice = ListIndice;

export const useListIndice = (params: UseListIndice) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listIndice(params),
      queryKey: [logQueryKeys.indices.all, params],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
