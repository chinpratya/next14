import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteOrganizationUser = (
  departmentId: string,
  userId: string
): Promise<void> =>
  apiClient.delete(
    `/user/org/department/${departmentId}/user/${userId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteOrganizationUser = {
  departmentId: string;
  onSuccess?: () => void;
};

export const useDeleteOrganizationUser = ({
  departmentId,
  onSuccess,
}: UseDeleteOrganizationUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userId: string) =>
      deleteOrganizationUser(departmentId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.organizationManagement.users(
          departmentId
        ),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.user.all,
        {
          ignore_departmentId: departmentId,
        },
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
