import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateActivityUsage = (
  activityId: string,
  isUsageData: boolean
): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/usage`,
    { isUsageData },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateActivityUsage = {
  activityId: string;
};

export const useUpdateActivityUsage = ({
  activityId,
}: UseUpdateActivityUsage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (isUsageData: boolean) =>
      updateActivityUsage(activityId, isUsageData),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.detail(activityId),
      ]);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
