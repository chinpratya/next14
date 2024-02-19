import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { GroupRole } from '../types';

export const updateGroupRole = (
  groupId: string,
  data: GroupRole[]
): Promise<void> =>
  apiClient.put(`/user/org/group/${groupId}/role`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UpdateGroupRole = {
  groupId: string;
  onSuccess?: () => void;
};

export const useUpdateGroupRole = ({
  groupId,
  onSuccess,
}: UpdateGroupRole) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: GroupRole[]) =>
      updateGroupRole(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        adminQueryKeys.group.roles(groupId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
