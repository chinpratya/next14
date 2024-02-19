import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddDisclosureActorOfActivity = {
  activityId: string;
  actorId: string;
};

export const addDisclosureActorOfActivity = ({
  activityId,
  actorId,
}: AddDisclosureActorOfActivity) =>
  apiClient.post(
    `/activity/${activityId}/disclosure/actor`,
    {
      actorID: actorId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddDisclosureActorOfActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddDisclosureActorOfActivity = ({
  activityId,
  onSuccess,
}: UseAddDisclosureActorOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (actorId: string) =>
      addDisclosureActorOfActivity({
        activityId,
        actorId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.disclosureActors(
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
