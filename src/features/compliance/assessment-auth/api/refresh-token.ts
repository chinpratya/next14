import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { RefreshTokenSchema } from '../schemas/auth';
import { RefreshToken } from '../types/auth';

export const refreshToken = async (
  refreshToken: string
): Promise<RefreshToken> => {
  const response = await apiClient.post(
    `/portal/login/refresh-token`,
    {
      refreshToken,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return RefreshTokenSchema.parse(response.data);
};

export type UseRefreshToken = {
  onSuccess?: (refreshToken: RefreshToken) => void;
};

export const useRefreshToken = ({
  onSuccess,
}: UseRefreshToken) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: refreshToken,
    onSuccess: (refreshToken) => {
      onSuccess?.(refreshToken);
    },
  });
  return {
    submit: mutate,
    isLoading,
  };
};
