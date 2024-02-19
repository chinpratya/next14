import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { PositionSchema } from '../schemas';
import { Position } from '../types';

export const getJobTitle = async (
  positionId: string
): Promise<Position> => {
  const { data } = await apiClient.get(
    `/user/org/position/${positionId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return PositionSchema.parse(data);
};

export const useGetJobTitle = (positionId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        adminQueryKeys.jobTitle.detail(positionId),
      ],
      queryFn: () => getJobTitle(positionId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
