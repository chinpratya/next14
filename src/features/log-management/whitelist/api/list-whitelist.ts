import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { WhitelistResponseSchema } from '../schemas';
import { WhitelistResponse } from '../types';

type ListWhitelist = Request & {
  page_size: number;
};

export const listWhitelist = async (
  params: ListWhitelist
): Promise<WhitelistResponse> => {
  const response = await apiClient.get(`/log/whitelist`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    params,
  });
  return WhitelistResponseSchema.parse(response);
};

type UseListWhitelist = ListWhitelist;

export const useListWhitelist = (
  params: UseListWhitelist
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listWhitelist(params),
      queryKey: [logQueryKeys.whitelist.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
