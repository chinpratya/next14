import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';

import { CookieReportSummarySchema } from '../schemas';
import { CookieReportSummary } from '../types';

export const getScanReport = async (
  domainId: string
): Promise<CookieReportSummary> => {
  const response = await apiClient.get(
    `/dashboard/${domainId}/detail`,
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

  return CookieReportSummarySchema.parse(response.data);
};

export const useGetScanReport = (domainId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        cookieManagementQueryKeys.scanReport.detail(
          domainId
        ),
      ],
      queryFn: () => getScanReport(domainId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
