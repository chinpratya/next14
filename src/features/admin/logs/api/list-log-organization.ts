import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_AUDIT_LOG_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { LogOrganizationResponseSchemas } from '../schemas';
import { LogOrganizationResponse } from '../types';

export const listLogOrganization = async (
  filter: string,
  search: string,
  page: number,
  pageSize: number
): Promise<LogOrganizationResponse> => {
  const response = await apiClient.get(
    `/event?filter=${filter}`,
    {
      baseURL: API_ENDPOINT_ONEFENCE_AUDIT_LOG_BASE_URL,
      params: { search, page, pageSize },
    }
  );

  return LogOrganizationResponseSchemas.parse(response);
};

export type UseListLogOrganization = {
  search?: string;
  filter?: string;
  page: number;
  pageSize: number;
};
export const useListLogOrganization = ({
  search = '',
  filter = '',
  page,
  pageSize,
}: UseListLogOrganization) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.logs.all(
          filter,
          search,
          page,
          pageSize
        ),
      ],
      queryFn: () =>
        listLogOrganization(
          filter,
          search,
          page,
          pageSize
        ),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
