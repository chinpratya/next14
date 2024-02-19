import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteActivityUseAndPublishUsageRelatedPerson = {
  activityId: string;
  peopleId: string;
};
export const deleteActivityUseAndPublishUsageRelatedPerson =
  ({
    activityId,
    peopleId,
  }: DeleteActivityUseAndPublishUsageRelatedPerson): Promise<void> =>
    apiClient.delete(
      `/activity/${activityId}/usage/people/${peopleId}`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

export type UseDeleteActivityUseAndPublishUsageRelatedPerson =
  {
    onSuccess?: () => void;
    activityId: string;
  };

export const useDeleteActivityUseAndPublishUsageRelatedPerson =
  ({
    onSuccess,
    activityId,
  }: UseDeleteActivityUseAndPublishUsageRelatedPerson) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (peopleId: string) =>
        deleteActivityUseAndPublishUsageRelatedPerson({
          activityId,
          peopleId,
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          dataMappingQueryKeys.activity.usageRelatedPerson(
            activityId
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
