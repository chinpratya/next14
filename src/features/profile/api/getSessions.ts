import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';

import { SessionResponseSchema } from '../schemas';
import { SessionResponse } from '../types';

export const getSessions =
  async (): Promise<SessionResponse> => {
    const response = await apiClient.get(
      '/user/auth/session',
      {
        baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      }
    );
    return SessionResponseSchema.parse(response);
  };

export const useGetSessions = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [profileQueryKeys.session.all],
      queryFn: () => getSessions(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
