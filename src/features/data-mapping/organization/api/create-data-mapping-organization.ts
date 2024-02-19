import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createDataMappingOrganizations = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/entity`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseCreateDataMappingOrganizations = {
  onSuccess?: () => void;
};

export const useCreateDataMappingOrganizations = ({
  onSuccess,
}: UseCreateDataMappingOrganizations) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createDataMappingOrganizations,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.organization.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
