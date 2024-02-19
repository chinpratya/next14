import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { User } from '../types';

export const updateUser = async (
  userId: string,
  data: User
): Promise<void> => {
  return await apiClient.put(
    `/user/org/user/${userId}`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
};

export type UseUpdateUser = {
  userId: string;
  onSuccess?: () => void;
};

export const useUpdateUser = ({
  userId,
  onSuccess,
}: UseUpdateUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: User) => updateUser(userId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.all,
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.user.detail(userId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
