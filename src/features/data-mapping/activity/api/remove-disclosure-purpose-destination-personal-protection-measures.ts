import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type RemoveDisclosurePurposeDestinationPersonalProtectionMeasures =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
    lawId: string;
  };

export const removeDisclosurePurposeDestinationPersonalProtectionMeasures =
  ({
    activityId,
    purposeId,
    destinationId,
    lawId,
  }: RemoveDisclosurePurposeDestinationPersonalProtectionMeasures): Promise<void> =>
    apiClient.delete(
      `/activity/${activityId}/disclosure/purpose/${purposeId}/destination/${destinationId}/personalProtectionMeasures/${lawId}`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

export type UseRemoveDisclosurePurposeDestinationPersonalProtectionMeasures =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
    onSuccess?: () => void;
  };

export const useRemoveDisclosurePurposeDestinationPersonalProtectionMeasures =
  ({
    activityId,
    purposeId,
    destinationId,
    onSuccess,
  }: UseRemoveDisclosurePurposeDestinationPersonalProtectionMeasures) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (lawId: string) =>
        removeDisclosurePurposeDestinationPersonalProtectionMeasures(
          {
            activityId,
            purposeId,
            destinationId,
            lawId,
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
