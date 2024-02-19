import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

export const deleteDataMappingOrganizations = async (
  organizationsId: string
): Promise<void> => {
  return apiClient.delete(`/entity/${organizationsId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseDeleteDataMappingOrganizations = {
  onSuccess?: () => void;
};

export const useDeleteDataMappingOrganizations = ({
  onSuccess,
}: UseDeleteDataMappingOrganizations) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteDataMappingOrganizations,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.organization.all,
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
