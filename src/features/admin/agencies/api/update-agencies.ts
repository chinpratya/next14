import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateAgencies = {
  groupID: string;
  data: Record<string, unknown>;
};
export const updateAgencies = ({
  groupID,
  data,
}: UpdateAgencies): Promise<void> =>
  apiClient.put(`/user/org/group/${groupID}`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseUpdateAgencies = {
  groupID: string;
  onSuccess?: () => void;
};

export const useUpdateAgencies = ({
  onSuccess,
  groupID,
}: UseUpdateAgencies) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateAgencies({ groupID, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.group.detail(groupID),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.group.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
