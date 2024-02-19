import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { UserByIdResponseSchema } from '../schemas';
import { UserByIdResponse } from '../types';

export const getUserDetail = async (
  userId: string
): Promise<UserByIdResponse> => {
  const response = await apiClient.get(
    `/user/org/user/${userId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return UserByIdResponseSchema.parse(response);
};

export const useGetUseDetail = (userId: string) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [adminQueryKeys.user.detail(userId)],
      queryFn: () => getUserDetail(userId),
      enabled: !!userId,
    });

  return {
    data: _.get(data, 'data'),
    isLoading: isFetching && !isFetched,
    isError,
  };
};
