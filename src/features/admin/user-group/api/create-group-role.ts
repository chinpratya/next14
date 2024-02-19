import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createGroupRole = (
  groupId: string,
  roleId: string[]
) =>
  apiClient.post(
    `/user/org/group/${groupId}/role`,
    {
      groupId,
      roleId,
    },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseCreateGroupRole = {
  groupId: string;
  onSuccess?: () => void;
};

export const useCreateGroupRole = ({
  groupId,
  onSuccess,
}: UseCreateGroupRole) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (roleId: string[]) =>
      createGroupRole(groupId, roleId),
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
