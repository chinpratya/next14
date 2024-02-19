import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';

import { UserMetaSchema } from '../schemas';
import { UserMeta } from '../types';

export const getUserMeta =
  async (): Promise<UserMeta> => {
    const { data } = await apiClient.get(
      `/user/auth/meta`,
      {
        baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      }
    );

    return UserMetaSchema.parse(data);
  };

export const useGetUserMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [profileQueryKeys.meta.all],
      queryFn: getUserMeta,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
