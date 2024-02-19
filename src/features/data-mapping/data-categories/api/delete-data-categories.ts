import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

type DeleteDataCategories = {
  dataCategoryID: string;
};

export const deleteDataCategories = async ({
  dataCategoryID,
}: DeleteDataCategories): Promise<void> => {
  return apiClient.delete(
    `/data-category/${dataCategoryID}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseDeleteDataCategories = {
  onSuccess?: () => void;
};

export const useDeleteDataCategories = ({
  onSuccess,
}: UseDeleteDataCategories) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteDataCategories,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.all,
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
