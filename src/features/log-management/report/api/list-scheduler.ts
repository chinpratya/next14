import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { ReportSchedulerResponseSchema } from '../schemas';
import { ReportSchedulerResponse } from '../types';

type Payload = {
  page?: number;
  pageSize?: number;
};

export const listScheduler = async ({
  page,
  pageSize,
}: Payload): Promise<ReportSchedulerResponse> => {
  const data = await apiClient.get(
    `/core/report_scheduler?module=LM&page${page}&page_size=${pageSize}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return ReportSchedulerResponseSchema.parse(data);
};

export const useListScheduler = (payload: Payload) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listScheduler(payload),
      queryKey: [
        coreQueryKeys.reportScheduler.all('LM'),
        payload,
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
