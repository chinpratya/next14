import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateActivityUseAndPublishUsageRelatedPerson = {
  peopleId: string;
  source: string;
};
export const updateActivityUseAndPublishUsageRelatedPerson =
  (
    activityId: string,
    peopleId: string,
    source: string
  ): Promise<void> =>
    apiClient.put(
      `/activity/${activityId}/usage/people/${peopleId}`,
      { description: source },
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

export type UseUpdateActivityUseAndPublishUsageRelatedPerson =
  {
    activityId: string;
    onSuccess?: () => void;
  };

export const useUpdateActivityUseAndPublishUsageRelatedPerson =
  ({
    activityId,
    onSuccess,
  }: UseUpdateActivityUseAndPublishUsageRelatedPerson) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: ({
        source,
        peopleId,
      }: UpdateActivityUseAndPublishUsageRelatedPerson) =>
        updateActivityUseAndPublishUsageRelatedPerson(
          activityId,
          peopleId,
          source
        ),
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
