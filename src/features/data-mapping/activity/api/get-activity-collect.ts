import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityCollectSchema } from '../schemas';
import { ActivityCollect } from '../types';

export const getActivityCollect = async (
  activityId: string
): Promise<ActivityCollect> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/collect`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ActivityCollectSchema.parse(data);
};

export const useGetActivityCollect = (
  activityId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.collect(activityId),
      ],
      queryFn: () => getActivityCollect(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
