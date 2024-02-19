import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityDisclosurePurposeResponseSchema } from '../schemas';
import { ActivityDisclosurePurposeResponse } from '../types';

export const listDisclosurePurposeOfActivity = async (
  activityId: string
): Promise<ActivityDisclosurePurposeResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/disclosure/purpose`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityDisclosurePurposeResponseSchema.parse(
    response
  );
};

export const useListDisclosurePurposeOfActivity = (
  activityId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.disclosurePurposeDetail(
          activityId
        ),
      ],
      queryFn: () =>
        listDisclosurePurposeOfActivity(activityId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
