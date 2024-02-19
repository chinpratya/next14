import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type RemoveActivityActor = {
  activityId: string;
  actorType: string;
  actorId: string;
};

export const removeActivityActor = ({
  activityId,
  actorType,
  actorId,
}: RemoveActivityActor): Promise<void> =>
  apiClient.delete(
    `/activity/${activityId}/actor/${actorType}/${actorId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseRemoveActivityActor = {
  activityId: string;
  actorType: string;
  onSuccess?: () => void;
};

export const useRemoveActivityActor = ({
  activityId,
  actorType,
  onSuccess,
}: UseRemoveActivityActor) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (actorId: string) =>
      removeActivityActor({
        activityId,
        actorType,
        actorId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.actors(
          activityId,
          actorType
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
