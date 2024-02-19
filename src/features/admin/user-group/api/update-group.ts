import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

const updateGroup = (
  groupId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/user/org/group/${groupId}`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseUpdateGroup = {
  groupId: string;
  onSuccess?: () => void;
};

export const useUpdateGroup = ({
  groupId,
  onSuccess,
}: UseUpdateGroup) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateGroup(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        adminQueryKeys.group.all,
      ]);
      queryClient.invalidateQueries([
        adminQueryKeys.group.detail(groupId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
