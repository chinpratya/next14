import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityBasisSchema } from '../schemas';
import { ActivityBasis } from '../types';

export const getActivityBasis = async (
  activityId: string,
  basisId: string
): Promise<ActivityBasis> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/basis/${basisId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityBasisSchema.parse(data);
};

export type UseGetActivityBasis = {
  activityId: string;
  basisId: string;
};

export const useGetActivityBasis = ({
  activityId,
  basisId,
}: UseGetActivityBasis) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.basis(
          activityId,
          basisId
        ),
      ],
      queryFn: () =>
        getActivityBasis(activityId, basisId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
