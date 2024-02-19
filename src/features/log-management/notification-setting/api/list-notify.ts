import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { NotifyResponseSchema } from '../schemas';
import { NotifyResponse } from '../types';

export const listNotify = async (
  page: number,
  pageSize: number
): Promise<NotifyResponse> => {
  const response = await apiClient.get(
    `/core/notify?module=LM&page=${page}&page_size=${pageSize}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return NotifyResponseSchema.parse(response);
};

export type UseListNotify = {
  page: number;
  pageSize: number;
};

export const useListNotify = ({
  page,
  pageSize,
}: UseListNotify) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listNotify(page, pageSize),
      queryKey: [
        coreQueryKeys.notify.all,
        page,
        pageSize,
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
