import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createJobTitle = (
  position: Record<string, unknown>
): Promise<void> =>
  apiClient.post(`/user/org/position`, position, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseCreatePosition = {
  onSuccess?: () => void;
};
export const useCreateJobTitle = ({
  onSuccess,
}: UseCreatePosition) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createJobTitle,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.jobTitle.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
