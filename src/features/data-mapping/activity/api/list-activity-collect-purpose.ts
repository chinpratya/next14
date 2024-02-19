import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityCollectPurposeResponseSchema } from '../schemas';
import { ActivityCollectPurposeResponse } from '../types';

export const getActivityCollectPurpose = async (
  activityId: string
): Promise<ActivityCollectPurposeResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/collect/purpose`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ActivityCollectPurposeResponseSchema.parse(
    response
  );
};

export const useListActivityCollectPurpose = (
  activityId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.purpose(activityId),
      ],
      queryFn: () =>
        getActivityCollectPurpose(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
