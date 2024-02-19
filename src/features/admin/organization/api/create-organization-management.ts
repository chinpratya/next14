import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createOrganizationManagement = async (
  data: Record<string, unknown>
) =>
  apiClient.post(`/user/org/department`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseCreateOrganizationManagement = {
  onSuccess?: () => void;
};

export const useCreateOrganizationManagement = ({
  onSuccess,
}: UseCreateOrganizationManagement = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createOrganizationManagement,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationManagement.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
