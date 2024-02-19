import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { CookieConsentResponseSchema } from '../schemas';
import { CookieConsentResponse } from '../types';

export type ListCookieConsent = Request;

export const listCookieConsent = async ({
  ...params
}: ListCookieConsent): Promise<CookieConsentResponse> => {
  const response = await apiClient.get(`/cookieconsent`, {
    baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    params,
  });

  return CookieConsentResponseSchema.parse(response);
};

export const useListCookieConsent = ({
  ...params
}: ListCookieConsent) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        cookieManagementQueryKeys.cookieConsent.all,
        params,
      ],
      queryFn: () => listCookieConsent(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
