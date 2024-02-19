import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { ReportDownloadResponseSchema } from '../schemas';
import { ReportDownloadResponse } from '../types';

type Payload = {
  page: number;
  pageSize: number;
};

export const listDownload = async ({
  page,
  pageSize,
}: Payload): Promise<ReportDownloadResponse> => {
  const response = await apiClient.get(
    `/core/report/download?module=SIEM&page=${page}&page_size=${pageSize}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return ReportDownloadResponseSchema.parse(response);
};

export const useListDownload = (payload: Payload) => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => listDownload(payload),
    queryKey: [
      coreQueryKeys.reportDownload.all('SIEM'),
      payload,
    ],
    keepPreviousData: true,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    refetch,
  };
};
