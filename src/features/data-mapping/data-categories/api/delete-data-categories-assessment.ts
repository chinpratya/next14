import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

type DeleteDataCategoriesAssessent = {
  dataCategoriesId: string;
  assessmentId: string;
};

export const deleteDataCategoriesAssessent = async ({
  dataCategoriesId,
  assessmentId,
}: DeleteDataCategoriesAssessent): Promise<void> => {
  return apiClient.delete(
    `/data-category/${dataCategoriesId}/assessment/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseDeleteDataCategories = {
  onSuccess?: () => void;
  dataCategoriesId: string;
};

export const useDeleteDataCategoriesAssessent = ({
  onSuccess,
  dataCategoriesId,
}: UseDeleteDataCategories) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (assessmentId: string) =>
      deleteDataCategoriesAssessent({
        dataCategoriesId,
        assessmentId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.assessment(
          dataCategoriesId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
