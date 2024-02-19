import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateActivity = (
  activityId: string,
  activity: Record<string, unknown>
): Promise<void> =>
  apiClient.put(`/activity/${activityId}`, activity, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });

export type UseUpdateActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateActivity = ({
  activityId,
  onSuccess,
}: UseUpdateActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (activity: Record<string, unknown>) =>
      updateActivity(activityId, activity),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.detail(activityId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
