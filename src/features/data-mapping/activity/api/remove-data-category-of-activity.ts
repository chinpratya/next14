import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type RemoveDataCategoryOfActivity = {
  activityId: string;
  dataCategoryId: string;
};

export const removeDataCategoryOfActivity = ({
  activityId,
  dataCategoryId,
}: RemoveDataCategoryOfActivity): Promise<void> =>
  apiClient.delete(
    `/activity/${activityId}/data-category/${dataCategoryId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseRemoveDataCategoryOfActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useRemoveDataCategoryOfActivity = ({
  activityId,
  onSuccess,
}: UseRemoveDataCategoryOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (dataCategoryId: string) =>
      removeDataCategoryOfActivity({
        activityId,
        dataCategoryId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.dataCategory(
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
