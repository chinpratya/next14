import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { GroupSchema } from '../schemas';
import { Group } from '../types';

export const getGroup = async (
  groupId: string
): Promise<Group> => {
  const { data } = await apiClient.get(
    `/user/org/group/${groupId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return GroupSchema.parse(data);
};

export const useGetGroup = (groupId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.group.detail(groupId)],
      queryFn: () => getGroup(groupId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
