import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteActivityCollectChannel = {
  channelId: string;
  activityId: string;
};
export const deleteActivityCollectChannel = async ({
  channelId,
  activityId,
}: DeleteActivityCollectChannel): Promise<void> =>
  await apiClient.delete(
    `/activity/${activityId}/collect/channel/${channelId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

type UseDeleteActivityCollectChannel = {
  onSuccess?: () => void;
  activityId: string;
};
export const useDeleteActivityCollectChannel = ({
  onSuccess,
  activityId,
}: UseDeleteActivityCollectChannel) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteActivityCollectChannel,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.channel(activityId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
