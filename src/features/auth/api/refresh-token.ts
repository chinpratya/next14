import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { authStore } from '@/stores/auth';

import { AuthenticatedUserSchema } from '../schemas';
import { AuthenticatedUser } from '../types';

export const refreshToken = async (
  refresh_token: string
): Promise<AuthenticatedUser> => {
  const response = await apiClient.post(
    `/user/refresh-token`,
    { refresh_token },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return AuthenticatedUserSchema.parse(response.data);
};

export type UseRefreshToken = {
  onSuccess?: (data: AuthenticatedUser) => void;
  onError?: () => void;
};

export const useRefreshToken = ({
  onSuccess,
  onError,
}: UseRefreshToken) => {
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      authStore.getState().logout();
      onError?.();
    },
  });

  return {
    submit: mutate,
    isError,
    isLoading,
  };
};
