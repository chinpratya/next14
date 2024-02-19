import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddDataCategoryOfActivity = {
  activityId: string;
  dataCategoriesId: string[];
};

export const addDataCategoryOfActivity = async ({
  activityId,
  dataCategoriesId,
}: AddDataCategoryOfActivity): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/data-category`,
    {
      dataCategoryID: dataCategoriesId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddDataCategoryOfActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddDataCategoryOfActivity = ({
  activityId,
  onSuccess,
}: UseAddDataCategoryOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (dataCategoriesId: string[]) =>
      addDataCategoryOfActivity({
        activityId,
        dataCategoriesId,
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
