import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteActivityCollectAccess = {
  activityId: string;
  accessId: string;
};
export const deleteActivityCollectAccess = async ({
  accessId,
  activityId,
}: DeleteActivityCollectAccess): Promise<void> =>
  await apiClient.delete(
    `/activity/${activityId}/collect/access/${accessId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

type UseDeleteActivityCollectAccess = {
  onSuccess?: () => void;
  activityId: string;
};
export const useDeleteActivityCollectAccess = ({
  onSuccess,
  activityId,
}: UseDeleteActivityCollectAccess) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (accessId: string) =>
      deleteActivityCollectAccess({
        activityId,
        accessId,
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
