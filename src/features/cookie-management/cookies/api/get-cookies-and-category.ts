import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';

import { CookieDomainDataSchema } from '../schemas';
import { CookieDomainData } from '../types';

export const getCookiesAndCategory = async (
  domainId: string
): Promise<CookieDomainData> => {
  const response = await apiClient.get(
    `/category/${domainId}`,
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

  return CookieDomainDataSchema.parse(response.data);
};

export const useGetCookiesAndCategory = (
  domainId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        cookieManagementQueryKeys.cookiesCategory.detail(
          domainId
        ),
      ],
      queryFn: () => getCookiesAndCategory(domainId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
