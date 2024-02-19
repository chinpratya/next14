import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { settingQueryKeys } from '@/lib/queryKeys/setting';
import { Request } from '@/types';

import { DepartmentResponseSchema } from '../schemas';
import { DepartmentResponse } from '../types';

export type ListBranch = Request & {
  page_size: number;
};

export const listBranch = async ({
  ...params
}): Promise<DepartmentResponse> => {
  const response = await apiClient.get(
    `/setting/organization/branch`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      params,
    }
  );
  return DepartmentResponseSchema.parse(response);
};

export const useListBranch = ({
  ...params
}: ListBranch) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        settingQueryKeys.organization.branch,
        params,
      ],
      queryFn: () => listBranch(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
