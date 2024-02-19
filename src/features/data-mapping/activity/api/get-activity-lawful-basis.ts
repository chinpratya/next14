import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityLawfulBasisSchema } from '../schemas';
import { ActivityLawfulBasis } from '../types';

export const getActivityLawfulBasis = async (
  activityId: string
): Promise<ActivityLawfulBasis> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/lawful-basis`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityLawfulBasisSchema.parse(data);
};

export const useGetActivityLawfulBasis = (
  activityId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.lawfulBasis(
          activityId
        ),
      ],
      queryFn: () => getActivityLawfulBasis(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
