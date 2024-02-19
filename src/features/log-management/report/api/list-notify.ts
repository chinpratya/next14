import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { NotifyListResponseSchema } from '../../indices/schemas';
import { NotifyListResponse } from '../../indices/types';

export const listNotify =
  async (): Promise<NotifyListResponse> => {
    const response = await apiClient.get(
      `/core/notify?module=LM&response_type=lists&page_size=${100}`,
      { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
    );
    return NotifyListResponseSchema.parse(response);
  };

export const useListNotify = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listNotify(),
      queryKey: [coreQueryKeys.notifyList.all],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
