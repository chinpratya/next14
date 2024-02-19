import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { AgenciesResponseSchema } from '../schemas';
import { AgenciesResponse } from '../types';

type ListAgencies = Request & {
  type_group: string;
  page_size?: number;
};

export const listAgencies = async (
  params: ListAgencies
): Promise<AgenciesResponse> => {
  const result = await apiClient.get(`/user/org/group`, {
    params,
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

  return AgenciesResponseSchema.parse(result);
};

type UseListAgencies = ListAgencies;

export const useListAgencies = (
  params: UseListAgencies
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.group.all, params],
      queryFn: () => listAgencies(params),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
