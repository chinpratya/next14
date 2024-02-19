import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteActivityCollectDataRetention = {
  dataRetentionId: string;
  activityId: string;
};
export const deleteActivityCollectDataRetention = async ({
  dataRetentionId,
  activityId,
}: DeleteActivityCollectDataRetention): Promise<void> =>
  await apiClient.delete(
    `/activity/${activityId}/collect/data-retention/${dataRetentionId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

type UseDeleteActivityCollectDataRetention = {
  onSuccess?: () => void;
  activityId: string;
};
export const useDeleteActivityCollectDataRetention = ({
  onSuccess,
  activityId,
}: UseDeleteActivityCollectDataRetention) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteActivityCollectDataRetention,
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
