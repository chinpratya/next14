import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityCollectOfActivityAccessResponseSchema } from '../schemas';
import { ActivityCollectOfActivityAccessResponse } from '../types';

export const getActivityCollectOfActivityAccess = async (
  activityId: string
): Promise<ActivityCollectOfActivityAccessResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/collect/access`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ActivityCollectOfActivityAccessResponseSchema.parse(
    response
  );
};

export const useListActivityCollectOfActivityAccess = (
  activityId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.collectAccess(
          activityId
        ),
      ],
      queryFn: () =>
        getActivityCollectOfActivityAccess(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
