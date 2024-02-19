import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createGroup = (
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.post(`/user/org/group`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseCreateGroup = {
  onSuccess?: () => void;
};

export const useCreateGroup = ({
  onSuccess,
}: UseCreateGroup) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries([
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
