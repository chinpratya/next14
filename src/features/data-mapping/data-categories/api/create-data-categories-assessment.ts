import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createDataCategoriesAssessment = async (
  data: Record<string, unknown>,
  dataCategoryID: string
): Promise<void> =>
  await apiClient.post(
    `/data-category/${dataCategoryID}/assessment`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseCreateDataCategoriesAssessment = {
  onSuccess?: () => void;
  dataCategoryID: string;
};

export const useCreateDataCategoriesAssessment = ({
  onSuccess,
  dataCategoryID,
}: UseCreateDataCategoriesAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createDataCategoriesAssessment(
        data,
        dataCategoryID
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.assessment(
          dataCategoryID
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
