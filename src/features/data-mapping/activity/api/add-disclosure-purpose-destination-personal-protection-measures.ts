import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddDisclosurePurposeDestinationPersonalProtectionMeasures =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
    lawIDs: React.Key[];
  };

export const addDisclosurePurposeDestinationPersonalProtectionMeasures =
  ({
    activityId,
    purposeId,
    destinationId,
    lawIDs,
  }: AddDisclosurePurposeDestinationPersonalProtectionMeasures) =>
    apiClient.put(
      `/activity/${activityId}/disclosure/purpose/${purposeId}/destination/${destinationId}/personalProtectionMeasures`,
      {
        lawIDs,
      },
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

export type UseAddDisclosurePurposeDestinationPersonalProtectionMeasures =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
    onSuccess?: () => void;
  };

export const useAddDisclosurePurposeDestinationPersonalProtectionMeasures =
  ({
    activityId,
    purposeId,
    destinationId,
    onSuccess,
  }: UseAddDisclosurePurposeDestinationPersonalProtectionMeasures) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (lawIDs: React.Key[]) =>
        addDisclosurePurposeDestinationPersonalProtectionMeasures(
          {
            activityId,
            purposeId,
            destinationId,
            lawIDs,
          }
        ),
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          dataMappingQueryKeys.activity.disclosurePurposeDestinationMeasure(
            activityId,
            purposeId,
            destinationId
          ),
        ]);

        onSuccess?.();
      },
    });

    return {
      submit: mutate,
      isLoading,
    };
  };
