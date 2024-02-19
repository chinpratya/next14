import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { RoleResponseSchema } from '../schemas';
import { RoleResponse } from '../types';

export type ListRole = Request & {
  ignore_groupId?: string;
  ignore_userId?: string;
};

export const listRole = async ({
  ...params
}: ListRole): Promise<RoleResponse> => {
  const response = await apiClient.get(`/user/org/role`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    params,
  });

  return RoleResponseSchema.parse(response);
};

export type UseListRole = ListRole;

export const useListRole = ({
  ...params
}: UseListRole) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.role.all, { ...params }],
      queryFn: () =>
        listRole({
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
