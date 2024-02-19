import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_AUTH_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';

export const getUser = (
  accessToken: string
): Promise<unknown> => {
  if (!accessToken) {
    return Promise.reject(new Error('No access token'));
  }
  return apiClient.post(
    '/getuser',
    {
      AccessToken: accessToken,
    },
    {
      baseURL: API_ENDPOINT_AUTH_BASE_URL,
    }
  );
};

type UsedGetUser = {
  accessToken: string;
};

export const useGetUser = ({
  accessToken,
}: UsedGetUser) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ['auth-user'],
      queryFn: () => getUser(accessToken),
      cacheTime: 60,
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
