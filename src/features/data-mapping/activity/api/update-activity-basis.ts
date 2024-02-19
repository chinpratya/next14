import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateActivityBasis = (
  activityId: string,
  basisId: string,
  activity: Record<string, unknown>
): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/basis/${basisId}`,
    activity,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateActivityBasis = {
  activityId: string;
  basisId: string;
  onSuccess?: () => void;
};

export const useUpdateActivityBasis = ({
  activityId,
  basisId,
  onSuccess,
}: UseUpdateActivityBasis) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (activity: Record<string, unknown>) =>
      updateActivityBasis(activityId, basisId, activity),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.basis(
          activityId,
          basisId
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
