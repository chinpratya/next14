import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';

import { UserGroupResponseSchema } from '../schemas';
import { UserGroupResponse } from '../types';

export const getUserGroup =
  async (): Promise<UserGroupResponse> => {
    const response = await apiClient.get(
      '/user/auth/group',
      {
        baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      }
    );

    return UserGroupResponseSchema.parse(response);
  };

export const useGetUserGroup = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [profileQueryKeys.userGroup.all],
      queryFn: () => getUserGroup(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
