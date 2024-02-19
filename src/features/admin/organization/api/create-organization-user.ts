import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createOrganizationUser = async (
  organizationId: string,
  data: Record<string, unknown>
) =>
  apiClient.post(
    `/user/org/department/${organizationId}/user`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseCreateOrganizationUser = {
  organizationId: string;
  onSuccess?: () => void;
};

export const useCreateOrganizationUser = ({
  organizationId,
  onSuccess,
}: UseCreateOrganizationUser) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createOrganizationUser(organizationId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationManagement.users(
          organizationId
        ),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.user.all,
        {
          ignore_departmentId: organizationId,
        },
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
