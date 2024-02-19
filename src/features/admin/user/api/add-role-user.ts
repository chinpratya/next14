import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { CreateUserResponseSchema } from '../schemas';
import {
  AddUserResponse,
  AddRoleUserPayload,
} from '../types';

export const addRoleUser = async (
  data: AddRoleUserPayload
): Promise<AddUserResponse> => {
  const response = await apiClient.post(
    `/user/org/user/${data.userId}/role`,
    { roleId: data.roleId },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return CreateUserResponseSchema.parse(response);
};

export type UseAddRoleUser = {
  onSuccess?: () => void;
  userId: string;
  toggleModal: () => void;
};

export const useAddRoleUser = ({
  onSuccess,
  userId,
  toggleModal,
}: UseAddRoleUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: addRoleUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.roles(userId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.role.all,
        {
          ignore_userId: userId,
        },
      ]);
      onSuccess?.();
      toggleModal?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
