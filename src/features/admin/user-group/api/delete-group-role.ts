import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteGroupRole = (
  groupId: string,
  roleId: string
) =>
  apiClient.delete(
    `/user/org/group/${groupId}/role/${roleId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteGroupRole = {
  groupId: string;
  onSuccess?: () => void;
};

export const useDeleteGroupRole = ({
  groupId,
  onSuccess,
}: UseDeleteGroupRole) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (roleId: string) =>
      deleteGroupRole(groupId, roleId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.group.roles(groupId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.role.all,
        { ignore_groupId: groupId },
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
