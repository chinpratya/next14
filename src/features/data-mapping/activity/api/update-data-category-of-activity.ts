import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateDataCategoryOfActivity = {
  activityId: string;
  dataCategoryId: string;
  sourcesId: string[];
};

export const updateDataCategoryOfActivity = ({
  activityId,
  dataCategoryId,
  sourcesId,
}: UpdateDataCategoryOfActivity): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/data-category/${dataCategoryId}`,
    {
      sourceID: sourcesId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateDataCategoryOfActivity = {
  activityId: string;
  dataCategoryId: string;
  onSuccess?: () => void;
};

export const useUpdateDataCategoryOfActivity = ({
  activityId,
  dataCategoryId,
  onSuccess,
}: UseUpdateDataCategoryOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (sourcesId: string[]) =>
      updateDataCategoryOfActivity({
        activityId,
        dataCategoryId,
        sourcesId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.dataCategoryDetail(
          activityId,
          dataCategoryId
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
