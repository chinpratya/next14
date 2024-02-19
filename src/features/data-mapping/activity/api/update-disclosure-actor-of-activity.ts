import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateDisclosureActorOfActivity = {
  activityId: string;
  actorId: string;
  purposeId: string;
};

export const updateDisclosureActorOfActivity = ({
  activityId,
  actorId,
  purposeId,
}: UpdateDisclosureActorOfActivity): Promise<
  Record<string, unknown>
> => {
  return apiClient.put(
    `/activity/${activityId}/disclosure/actor/${actorId}`,
    {
      purposeID: purposeId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseUpdateDisclosureActorOfActivity = {
  activityId: string;
  actorId: string;
  onSuccess?: (data: Record<string, unknown>) => void;
};

export const useUpdateDisclosureActorOfActivity = ({
  activityId,
  actorId,
  onSuccess,
}: UseUpdateDisclosureActorOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (purposeId: string) =>
      updateDisclosureActorOfActivity({
        activityId,
        actorId,
        purposeId,
      }),
    onSuccess: async (data) => {
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
      // await queryClient.invalidateQueries([
      //   dataMappingQueryKeys.activity.disclosurePurposeDestination(
      //     activityId,
      //     key
      //   ),
      // ]);
      onSuccess?.(data);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
