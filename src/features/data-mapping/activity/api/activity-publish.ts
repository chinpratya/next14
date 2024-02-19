import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ResponseSchema } from '@/schema';

export const activityPublish = async (
  activityId: string
): Promise<Record<string, unknown>> => {
  const response = await apiClient.post(
    `/activity/${activityId}/publish`,
    undefined,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ResponseSchema.parse(response);
};

export type UseActivityPublish = {
  onSuccess?: () => void;
};

export const useActivityPublish = ({
  onSuccess,
}: UseActivityPublish) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (activityId: string) =>
      activityPublish(activityId),
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
