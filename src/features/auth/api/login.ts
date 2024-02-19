import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { AuthenticatedUserSchema } from '../schemas';
import { AuthenticatedUser } from '../types';

export const login = async (
  data: Record<string, unknown>
): Promise<AuthenticatedUser> => {
  const response = await apiClient.post(
    `/user/signin`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return AuthenticatedUserSchema.parse(response.data);
};

type UseLoginOptions = {
  onSuccess?: (data: AuthenticatedUser) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({
  onSuccess,
  onError,
}: UseLoginOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return { submit, isLoading };
};
