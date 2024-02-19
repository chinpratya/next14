import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { Request } from '@/types';

import { CookieDomainListSchema } from '../schemas';
import { CookieDomainList } from '../types';

export type ListDomain = Request;

export const listDomain = async ({
  ...params
}): Promise<CookieDomainList> => {
  const response = await apiClient.get(`/domain`, {
    baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    params,
  });

  return CookieDomainListSchema.parse(response);
};

const REFRESH_INTERVAL = 1000 * 60 * 5;

export const useListDomain = ({
  ...params
}: ListDomain) => {
  const [isRefreshing, setIsRefresh] = useState(false);

  const { data, isFetching, isFetched, isError } =
    useQuery({
      refetchInterval: REFRESH_INTERVAL,
      refetchIntervalInBackground: true,
      queryKey: [
        cookieManagementQueryKeys.domain.all,
        params,
      ],
      queryFn: () => listDomain(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefreshing,
    refresh: async () => {
      setIsRefresh(true);
      await queryClient.invalidateQueries([
        cookieManagementQueryKeys.domain.all,
        params,
      ]);
      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      setIsRefresh(false);
    },
  };
};
