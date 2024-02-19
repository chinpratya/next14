import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { InitDataPasswordSchema } from '../schemas';
import { InitPassword } from '../types';

export const getDataInitPassword =
  async (): Promise<InitPassword> => {
    const { data } = await apiClient.get(
      `/user/org/init-password`,
      {
        baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      }
    );

    return InitDataPasswordSchema.parse(data);
  };

export const useGetDataInitPassword = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.password.all],
      queryFn: () => getDataInitPassword(),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
