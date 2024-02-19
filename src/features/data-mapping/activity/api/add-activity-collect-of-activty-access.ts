import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityCollectAccess = {
  activityId: string;
  payload: Record<string, unknown>;
};

export const addActivityCollectAccess = ({
  activityId,
  payload,
}: AddActivityCollectAccess): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/collect/access`,
    payload,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityCollectPurpose = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddActivityCollectAccess = ({
  activityId,
  onSuccess,
}: UseAddActivityCollectPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      addActivityCollectAccess({
        activityId,
        payload,
      }),
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
