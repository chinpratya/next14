import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateOrganizationLv = (
  levelId: string,
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.put(`/user/org/level/${levelId}`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseUpdateOrganizationLv = {
  levelId: string;
  onSuccess?: () => void;
};

export const useUpdateOrganizationLv = ({
  levelId,
  onSuccess,
}: UseUpdateOrganizationLv) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateOrganizationLv(levelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        adminQueryKeys.organizationDetail.level(levelId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
