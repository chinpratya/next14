import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';
import { useAuth } from '@/stores/auth';

import { ProfileSchema } from '../schemas';
import { Profile } from '../types';

export const getProfile = async (): Promise<Profile> => {
  const { data } = await apiClient.get(
    '/user/auth/info',
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return ProfileSchema.parse(data);
};
export const useGetProfile = () => {
  const { access_role } = useAuth();

  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled: access_role === 'portal' ? false : true,
      queryKey: [profileQueryKeys.profile.all],
      queryFn: () => getProfile(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
