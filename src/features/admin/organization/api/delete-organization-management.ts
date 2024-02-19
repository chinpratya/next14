import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteOrganizationManagement = async (
  organizationId: string
): Promise<void> =>
  await apiClient.delete(
    `/user/org/department/${organizationId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteOrganizationManagement = {
  onSuccess?: () => void;
};

export const useDeleteOrganizationManagement = ({
  onSuccess,
}: UseDeleteOrganizationManagement = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteOrganizationManagement,
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
