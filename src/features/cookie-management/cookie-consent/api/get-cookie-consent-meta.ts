import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';

import { CookieConsentMetaSchema } from '../schemas';
import { CookieConsentMeta } from '../types';

export const getCookieConsentMeta =
  async (): Promise<CookieConsentMeta> => {
    const { data } = await apiClient.get(
      `/cookieconsent/meta`,
      {
        baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
      }
    );

    return CookieConsentMetaSchema.parse(data);
  };

export const useGetCookieConsentMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        cookieManagementQueryKeys.cookieConsent.meta,
      ],
      queryFn: () => getCookieConsentMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
