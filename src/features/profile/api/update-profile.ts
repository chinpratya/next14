import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateProfile = (
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.put(`/user/auth/info`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseUpdateProfile = {
  onSuccess?: () => void;
};

export const useUpdateProfile = ({
  onSuccess,
}: UseUpdateProfile) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        profileQueryKeys.profile.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
