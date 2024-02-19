import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { CreateUserResponseSchema } from '../schemas';
import { CreateUserResponse } from '../types';

type resetPasswordProps = {
  userId: string;
  password: string;
  temporary: boolean;
};

export const resetPassword = async ({
  userId,
  password,
  temporary,
}: resetPasswordProps): Promise<CreateUserResponse> => {
  const payload = {
    password,
    temporary,
  };
  const response = await apiClient.post(
    `/user/auth/user/${userId}/reset-password`,
    payload,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return CreateUserResponseSchema.parse(response);
};

export type UseResetPassword = {
  onSuccess?: () => void;
};

export const useResetPassword = ({
  onSuccess,
}: UseResetPassword) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries([
        adminQueryKeys.user.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
