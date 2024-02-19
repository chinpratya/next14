import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { UserResponseSchema } from '../schemas';
import { ListUserResponse } from '../types';

export type ListUser = Request & {
  ignore_groupId?: string;
  ignore_departmentId?: string;
  default?: 'not_expand' | 'expand';
};

export const listUser = async ({
  ...params
}: ListUser): Promise<ListUserResponse> => {
  const response = await apiClient.get(`/user/org/user`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    params,
  });

  return UserResponseSchema.parse(response);
};

export type UseListUser = ListUser;

export const useListUser = ({
  ...params
}: UseListUser) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryFn: () => listUser({ ...params }),
      queryKey: [adminQueryKeys.user.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
