import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

export const deletePurpose = async (
  purposeId: string
): Promise<void> => {
  return apiClient.delete(`/purpose/${purposeId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseDeletePurpose = {
  onSuccess?: () => void;
};

export const useDeletePurpose = ({
  onSuccess,
}: UseDeletePurpose) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deletePurpose,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.purpose.all,
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
