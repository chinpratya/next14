import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_AUDIT_LOG_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { auditLogQueryKeys } from '@/lib/queryKeys/audit-log';

import { SystemUsageHistoryResponseSchemas } from '../schemas';
import { SystemUsageHistoryResponse } from '../types';

export const listSystemUsageHistory = async (
  search: string,
  page: number,
  pageSize: number
): Promise<SystemUsageHistoryResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINT_ONEFENCE_AUDIT_LOG_BASE_URL}/event?filter=${search}&page=${page}&page_size=${pageSize}`
  );

  return SystemUsageHistoryResponseSchemas.parse(
    response
  );
};

export type UseListSystemUsageHistory = {
  search?: string;
  page: number;
  pageSize: number;
};
export const useListSystemUsageHistory = ({
  search = '',
  page,
  pageSize,
}: UseListSystemUsageHistory) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        auditLogQueryKeys.historySystem.all(
          search,
          page,
          pageSize
        ),
      ],
      queryFn: () =>
        listSystemUsageHistory(search, page, pageSize),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
