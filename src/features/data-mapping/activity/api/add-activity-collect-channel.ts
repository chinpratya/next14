import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityCollectChannel = {
  activityId: string;
  channelID: string[];
};

export const addActivityCollectChannel = ({
  activityId,
  channelID,
}: AddActivityCollectChannel): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/collect/channel`,
    {
      channelID,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityCollectChannel = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddActivityCollectChannel = ({
  activityId,
  onSuccess,
}: UseAddActivityCollectChannel) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (channelID: string[]) =>
      addActivityCollectChannel({
        activityId,
        channelID,
      }),
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
