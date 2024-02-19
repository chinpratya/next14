import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateDataCategories = (
  dataCategoriesId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(
    `/data-category/${dataCategoriesId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateDataCategories = {
  dataCategoriesId: string;
  onSuccess?: () => void;
};

export const useUpdateDataCategories = ({
  dataCategoriesId,
  onSuccess,
}: UseUpdateDataCategories) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateDataCategories(dataCategoriesId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.all,
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.detail(
          dataCategoriesId
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
