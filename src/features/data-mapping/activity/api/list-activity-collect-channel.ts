import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityCollectChannelResponseSchema } from '../schemas';
import { ActivityCollectChannelResponse } from '../types';

export const getActivityCollectChannel = async (
  activityId: string
): Promise<ActivityCollectChannelResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/collect/channel`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ActivityCollectChannelResponseSchema.parse(
    response
  );
};

export const useListActivityCollectChannel = (
  activityId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.channel(activityId),
      ],
      queryFn: () =>
        getActivityCollectChannel(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
