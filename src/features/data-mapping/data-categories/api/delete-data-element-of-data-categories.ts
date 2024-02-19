import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

type DeleteDataElementOfDataCategories = {
  dataCategoryID: string;
  dataElementID: string;
};

export const deleteDataElementOfDataCategories = async ({
  dataCategoryID,
  dataElementID,
}: DeleteDataElementOfDataCategories): Promise<void> => {
  return apiClient.delete(
    `/data-category/${dataCategoryID}/data-element/${dataElementID}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseDeleteDataElementOfDataCategories = {
  onSuccess?: () => void;
  dataCategoryID: string;
};

export const useDeleteDataElementOfDataCategories = ({
  onSuccess,
  dataCategoryID,
}: UseDeleteDataElementOfDataCategories) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteDataElementOfDataCategories,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataElement.all,
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.dataElement(
          dataCategoryID
        ),
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.detail(
          dataCategoryID
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
