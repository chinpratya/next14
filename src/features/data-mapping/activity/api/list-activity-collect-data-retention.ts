import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityCollectDataRetentionResponseSchema } from '../schemas';
import { ActivityCollectDataRetentionResponse } from '../types';

export const getActivityCollectDataRetention = async (
  activityId: string
): Promise<ActivityCollectDataRetentionResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/collect/data-retention`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ActivityCollectDataRetentionResponseSchema.parse(
    response
  );
};

export const useListActivityCollectDataRetention = (
  activityId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dataRetention(
          activityId
        ),
      ],
      queryFn: () =>
        getActivityCollectDataRetention(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
