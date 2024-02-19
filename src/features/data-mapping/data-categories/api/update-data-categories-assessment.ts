import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateDataCategoriesAssessment = (
  dataCategoriesId: string,
  data: Record<string, unknown>,
  assessmentId: string
) =>
  apiClient.put(
    `/data-category/${dataCategoriesId}/assessment/${assessmentId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateDataCategoriesAssessment = {
  dataCategoriesId: string;
  onSuccess?: () => void;
  assessmentId: string;
};

export const useUpdateDataCategoriesAssessment = ({
  dataCategoriesId,
  assessmentId,
  onSuccess,
}: UseUpdateDataCategoriesAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateDataCategoriesAssessment(
        dataCategoriesId,
        data,
        assessmentId
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.assessmentDetail(
          dataCategoriesId,
          assessmentId
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
