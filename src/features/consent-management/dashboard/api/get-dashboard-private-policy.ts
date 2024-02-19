import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardCookieConsentSchema } from '../schemas';
import { DashboardCookieConsent } from '../types';

type GetDashboardPrivatePolicy = {
  duration?: string;
};

export const getDashboardPrivatePolicy = async ({
  duration,
}: GetDashboardPrivatePolicy): Promise<DashboardCookieConsent> => {
  const { data } = await apiClient.get(
    `/dashboard/policy`,
    {
      params: { duration },
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return DashboardCookieConsentSchema.parse(data);
};

type UseGetDashboardPrivatePolicy =
  GetDashboardPrivatePolicy;

export const useGetDashboardPrivatePolicy = ({
  duration,
}: UseGetDashboardPrivatePolicy) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.dashboard.policy,
        duration,
      ],
      queryFn: () =>
        getDashboardPrivatePolicy({ duration }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
