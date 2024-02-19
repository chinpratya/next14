import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys/siem';
import { queryString } from '@/utils';

import { RuleResponseSchema } from '../schemas';
import { RuleResponse } from '../types';

export const listRule = async (
  search: string,
  page: number,
  pageSize: number
): Promise<RuleResponse> => {
  const params = queryString.sample({
    page,
    page_size: pageSize,
    name: search,
  });

  const response = await apiClient.get(`/siem/rule`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });

  return RuleResponseSchema.parse(response);
};

export type UseListRule = {
  search?: string;
  page: number;
  pageSize: number;
};

export const useListRule = ({
  search = '',
  page,
  pageSize,
}: UseListRule) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listRule(search, page, pageSize),
      queryKey: [
        siemQueryKeys.rule.all,
        search,
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
