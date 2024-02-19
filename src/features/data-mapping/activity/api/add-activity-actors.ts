import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityActor = {
  activityId: string;
  actorType: string;
  actorIds: string[];
};

export const addActivityActor = ({
  activityId,
  actorType,
  actorIds,
}: AddActivityActor): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/actor/${actorType}`,
    {
      actorId: actorIds,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityActor = {
  activityId: string;
  actorType: string;
  onSuccess?: () => void;
};

export const useAddActivityActor = ({
  activityId,
  actorType,
  onSuccess,
}: UseAddActivityActor) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (actorIds: string[]) =>
      addActivityActor({
        activityId,
        actorType,
        actorIds,
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
