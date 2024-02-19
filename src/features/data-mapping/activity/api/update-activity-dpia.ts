import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateActivityDPIA = (
  activityId: string,
  payload: Record<string, unknown>
): Promise<void> =>
  apiClient.put(`/activity/${activityId}/dpia`, payload, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });

export type UseUpdateActivityDPIA = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateActivityDPIA = ({
  activityId,
  onSuccess,
}: UseUpdateActivityDPIA) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      updateActivityDPIA(activityId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.dpia(activityId),
      ]);
      queryClient.removeQueries([
        dataMappingQueryKeys.activity.dpiaInit(
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
