import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityUseAndPublishUsageRelatedPerson = {
  activityId: string;
  peopleID: string[];
};

export const addActivityUseAndPublishUsageRelatedPerson =
  ({
    activityId,
    peopleID,
  }: AddActivityUseAndPublishUsageRelatedPerson): Promise<void> =>
    apiClient.post(
      `/activity/${activityId}/usage/people`,
      {
        peopleID,
      },
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

export type UseAddActivityUseAndPublishUsageRelatedPerson =
  {
    activityId: string;
    onSuccess?: () => void;
  };

export const useAddActivityUseAndPublishUsageRelatedPerson =
  ({
    activityId,
    onSuccess,
  }: UseAddActivityUseAndPublishUsageRelatedPerson) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (peopleID: string[]) =>
        addActivityUseAndPublishUsageRelatedPerson({
          activityId,
          peopleID,
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
