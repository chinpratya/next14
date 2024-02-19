import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateActivityCollectAccess = (
  activityId: string,
  accessId: string,
  activity: Record<string, unknown>
): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/collect/access/${accessId}`,
    activity,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateActivityCollectAccess = {
  activityId: string;
  accessId: string;
  onSuccess?: () => void;
};

export const useUpdateActivityCollectAccess = ({
  activityId,
  accessId,
  onSuccess,
}: UseUpdateActivityCollectAccess) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (activity: Record<string, unknown>) =>
      updateActivityCollectAccess(
        activityId,
        accessId,
        activity
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.collectAccess(
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
