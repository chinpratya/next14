import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityCollectDataRetention = {
  activityId: string;
  dataRetentionID: string[];
};

export const addActivityCollectDataRetention = ({
  activityId,
  dataRetentionID,
}: AddActivityCollectDataRetention): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/collect/data-retention`,
    {
      dataRetentionID,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityCollectDataRetention = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddActivityCollectDataRetention = ({
  activityId,
  onSuccess,
}: UseAddActivityCollectDataRetention) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (dataRetentionID: string[]) =>
      addActivityCollectDataRetention({
        activityId,
        dataRetentionID,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.dataRetention(
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
