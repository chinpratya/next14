import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createUser = async (
  data: Record<string, unknown>
): Promise<string> => {
  const payload = {
    ...data,
    status: 'inactive',
  };
  const response = await apiClient.post(
    `/user/org/user`,
    payload,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return z.string().parse(_.get(response, 'userId'));
};

export type UseCreateUser = {
  onSuccess?: (userId: string) => void;
};

export const useCreateUser = ({
  onSuccess,
}: UseCreateUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: async (userId) => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.all,
      ]);
      onSuccess?.(userId);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
