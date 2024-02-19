import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';

import { CookieDashboardSummarySchema } from '../schemas';
import { CookieDashboardSummary } from '../types';

export const getDashboard = async (
  domainId: string
): Promise<CookieDashboardSummary> => {
  const response = await apiClient.get(
    `/dashboard/${domainId}/summary`,
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

  return CookieDashboardSummarySchema.parse(
    response.data
  );
};

export const useGetDashboard = (domainId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        cookieManagementQueryKeys.dashboard.detail(
          domainId
        ),
      ],
      queryFn: () => getDashboard(domainId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
