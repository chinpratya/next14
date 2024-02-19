import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateActivityCollectChannel = {
  channelId: string;
  sourceID: string[];
};

export const updateActivityCollectChannel = (
  activityId: string,
  channelId: string,
  sourceID: string[]
): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/collect/channel/${channelId}`,
    { sourceID },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateActivityCollectChannel = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateActivityCollectChannel = ({
  activityId,
  onSuccess,
}: UseUpdateActivityCollectChannel) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      sourceID,
      channelId,
    }: UpdateActivityCollectChannel) =>
      updateActivityCollectChannel(
        activityId,
        channelId,
        sourceID
      ),
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
