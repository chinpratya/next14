import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteActivity = (
  activityId: string
): Promise<void> =>
  apiClient.delete(`/activity/${activityId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });

export type UseDeleteActivity = {
  onSuccess?: () => void;
};

export const useDeleteActivity = ({
  onSuccess,
}: UseDeleteActivity = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
