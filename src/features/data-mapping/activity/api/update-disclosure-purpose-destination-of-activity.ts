import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateDisclosurePurposeDestinationOfActivity =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
    data: Record<string, unknown>;
  };

export const updateDisclosurePurposeDestinationOfActivity =
  ({
    activityId,
    purposeId,
    destinationId,
    data,
  }: UpdateDisclosurePurposeDestinationOfActivity) =>
    apiClient.put(
      `/activity/${activityId}/disclosure/purpose/${purposeId}/destination/${destinationId}`,
      data,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

export type UseUpdateDisclosurePurposeDestinationOfActivity =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
    onSuccess?: () => void;
  };

export const useUpdateDisclosurePurposeDestinationOfActivity =
  ({
    activityId,
    purposeId,
    destinationId,
    onSuccess,
  }: UseUpdateDisclosurePurposeDestinationOfActivity) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (data: Record<string, unknown>) =>
        updateDisclosurePurposeDestinationOfActivity({
          activityId,
          purposeId,
          destinationId,
          data,
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          dataMappingQueryKeys.activity.disclosurePurposeDestination(
            activityId,
            purposeId
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
