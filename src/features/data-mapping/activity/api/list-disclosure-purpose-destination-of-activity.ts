import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityDisclosurePurposeDestinationResponseSchema } from '../schemas';
import { ActivityDisclosurePurposeDestinationResponse } from '../types';

export type ListDisclosurePurposeDestinationOfActivity = {
  activityId: string;
  purposeId: string;
};

export const listDisclosurePurposeDestinationOfActivity =
  async ({
    activityId,
    purposeId,
  }: ListDisclosurePurposeDestinationOfActivity): Promise<ActivityDisclosurePurposeDestinationResponse> => {
    const response = await apiClient.get(
      `/activity/${activityId}/disclosure/purpose/${purposeId}/destination`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return ActivityDisclosurePurposeDestinationResponseSchema.parse(
      response
    );
  };

export type UseListDisclosurePurposeDestinationOfActivity =
  {
    activityId: string;
    purposeId: string;
  };

export const useListDisclosurePurposeDestinationOfActivity =
  ({
    activityId,
    purposeId,
  }: UseListDisclosurePurposeDestinationOfActivity) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          dataMappingQueryKeys.activity.disclosurePurposeDestination(
            activityId,
            purposeId
          ),
        ],
        queryFn: () =>
          listDisclosurePurposeDestinationOfActivity({
            activityId,
            purposeId,
          }),
        enabled: !!purposeId,
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
