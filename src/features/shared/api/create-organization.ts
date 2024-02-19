import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createOrganization = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/core/tenant`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseCreateOrganization = {
  onSuccess?: () => void;
};

export const useCreateOrganization = ({
  onSuccess,
}: UseCreateOrganization) => {
  const { isLoading, isError, mutate } = useMutation({
    mutationFn: createOrganization,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        coreQueryKeys.tenantStatus.detail,
      ]);
      onSuccess?.();
    },
  });

  return {
    isLoading,
    isError,
    submit: mutate,
  };
};
