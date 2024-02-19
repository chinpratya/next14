import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { OrganizationLevelSchema } from '../schemas';
import { OrganizationLevel } from '../types';

export const getOrganizationLv = async (
  levelId: string
): Promise<OrganizationLevel> => {
  const response = await apiClient.get(
    `/user/org/level/${levelId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return OrganizationLevelSchema.parse(response?.data);
};

export const useGetOrganizationLv = (levelId: string) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled: levelId !== '' && levelId !== undefined,
      queryKey: [
        adminQueryKeys.organizationDetail.level(levelId),
      ],
      queryFn: () => getOrganizationLv(levelId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
