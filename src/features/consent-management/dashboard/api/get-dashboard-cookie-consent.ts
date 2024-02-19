import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardCookieConsentSchema } from '../schemas';
import { DashboardCookieConsent } from '../types';

type GetDashboardCookieConsent = {
  duration?: string;
};

export const getDashboardCookieConsent = async ({
  duration,
}: GetDashboardCookieConsent): Promise<DashboardCookieConsent> => {
  const { data } = await apiClient.get(
    `/dashboard/cookie`,
    {
      params: { duration },
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return DashboardCookieConsentSchema.parse(data);
};

type UseGetDashboardCookieConsent =
  GetDashboardCookieConsent;

export const useGetDashboardCookieConsent = ({
  duration,
}: UseGetDashboardCookieConsent) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.dashboard.cookie,
        duration,
      ],
      queryFn: () =>
        getDashboardCookieConsent({ duration }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
