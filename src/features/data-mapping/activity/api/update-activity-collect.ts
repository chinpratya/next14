import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateActivityCollect = (
  activityId: string,
  activity: Record<string, unknown>
): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/collect`,
    activity,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateActivityCollect = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateActivityCollect = ({
  activityId,
  onSuccess,
}: UseUpdateActivityCollect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (activity: Record<string, unknown>) =>
      updateActivityCollect(activityId, activity),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.collect(activityId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
