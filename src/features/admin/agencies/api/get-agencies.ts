import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { AgenciesSchema } from '../schemas';
import { Agencies } from '../types';

export const getAgencies = async (
  groupID: string
): Promise<Agencies> => {
  const { data } = await apiClient.get(
    `/user/org/group/${groupID}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return AgenciesSchema.parse(data);
};

export const useGetAgencies = (groupID: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.group.detail(groupID)],
      queryFn: () => getAgencies(groupID),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
