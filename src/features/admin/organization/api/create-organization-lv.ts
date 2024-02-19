import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createOrganizationLv = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/user/org/level`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseCreateOrganizationLv = {
  onSuccess?: () => void;
};

export const useCreateOrganizationLv = ({
  onSuccess,
}: UseCreateOrganizationLv = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createOrganizationLv,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationDetail.levels,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
