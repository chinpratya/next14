import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateOrganizationManagement = async (
  organizationId: string,
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.put(
    `/user/org/department/${organizationId}`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseUpdateOrganizationManagement = {
  organizationId: string;
  onSuccess?: () => void;
};

export const useUpdateOrganizationManagement = ({
  organizationId,
  onSuccess,
}: UseUpdateOrganizationManagement) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateOrganizationManagement(organizationId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationManagement.detail(
          organizationId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
