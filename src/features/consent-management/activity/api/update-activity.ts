import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateActivity = {
  activityId: string;
  data: Record<string, unknown>;
};

export const updateActivity = async ({
  activityId,
  data,
}: UpdateActivity): Promise<void> => {
  return apiClient.put(`/activity/${activityId}`, data, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
  });
};

export type UseUpdateActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateActivity = ({
  activityId,
  onSuccess,
}: UseUpdateActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateActivity({ activityId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries([
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
