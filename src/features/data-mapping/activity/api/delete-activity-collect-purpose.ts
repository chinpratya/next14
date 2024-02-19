import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteActivityCollectPurpose = {
  purposeId: string;
  activityId: string;
};
export const deleteActivityCollectPurpose = async ({
  purposeId,
  activityId,
}: DeleteActivityCollectPurpose): Promise<void> =>
  await apiClient.delete(
    `/activity/${activityId}/collect/purpose/${purposeId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

type UseDeleteActivityCollectPurpose = {
  onSuccess?: () => void;
  activityId: string;
};
export const useDeleteActivityCollectPurpose = ({
  onSuccess,
  activityId,
}: UseDeleteActivityCollectPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteActivityCollectPurpose,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.purpose(activityId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
