import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { CreateUserResponseSchema } from '../schemas';
import {
  AddUserResponse,
  AddGroupUserPayload,
} from '../types';

export const addGroupUser = async (
  data: AddGroupUserPayload
): Promise<AddUserResponse> => {
  const response = await apiClient.post(
    `/user/org/user/${data.userId}/group`,
    { groupId: data.groupId },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return CreateUserResponseSchema.parse(response);
};

export type UseAddGroupUser = {
  onSuccess?: () => void;
  userId: string;
  toggleModal: () => void;
};

export const useAddGroupUser = ({
  onSuccess,
  userId,
  toggleModal,
}: UseAddGroupUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: addGroupUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.groups(userId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.group.all,
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
