import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityDestinationPersonalProtectionMeasuresResponseSchema } from '../schemas';
import { ActivityDestinationPersonalProtectionMeasuresResponse } from '../types';

export type ListDisclosurePurposeDestinationPersonalProtectionMeasures =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
  };

export const listDisclosurePurposeDestinationPersonalProtectionMeasures =
  async ({
    activityId,
    purposeId,
    destinationId,
  }: ListDisclosurePurposeDestinationPersonalProtectionMeasures): Promise<ActivityDestinationPersonalProtectionMeasuresResponse> => {
    const response = await apiClient.get(
      `/activity/${activityId}/disclosure/purpose/${purposeId}/destination/${destinationId}/personalProtectionMeasures`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return ActivityDestinationPersonalProtectionMeasuresResponseSchema.parse(
      response
    );
  };

export type UseListDisclosurePurposeDestinationPersonalProtectionMeasures =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
  };

export const useListDisclosurePurposeDestinationPersonalProtectionMeasures =
  ({
    activityId,
    purposeId,
    destinationId,
  }: UseListDisclosurePurposeDestinationPersonalProtectionMeasures) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          dataMappingQueryKeys.activity.disclosurePurposeDestinationMeasure(
            activityId,
            purposeId,
            destinationId
          ),
        ],
        queryFn: () =>
          listDisclosurePurposeDestinationPersonalProtectionMeasures(
            {
              activityId,
              purposeId,
              destinationId,
            }
          ),
        enabled: !!destinationId,
        keepPreviousData: true,
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
