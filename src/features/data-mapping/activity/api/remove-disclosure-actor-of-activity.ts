import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type RemoveDisclosureActorOfActivity = {
  activityId: string;
  actorId: string;
};

export const removeDisclosureActorOfActivity = ({
  activityId,
  actorId,
}: RemoveDisclosureActorOfActivity): Promise<void> =>
  apiClient.delete(
    `/activity/${activityId}/disclosure/actor/${actorId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseRemoveDisclosureActorOfActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useRemoveDisclosureActorOfActivity = ({
  activityId,
  onSuccess,
}: UseRemoveDisclosureActorOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (actorId: string) =>
      removeDisclosureActorOfActivity({
        activityId,
        actorId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.disclosureActors(
          activityId
        ),
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.disclosurePurposeDetail(
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
