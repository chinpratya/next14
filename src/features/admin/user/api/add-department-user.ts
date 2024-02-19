import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { CreateUserResponseSchema } from '../schemas';
import { AddUserResponse } from '../types';

type addDepartmentUserProps = {
  data: string[];
  userId: string;
};
export const addDepartmentUser = async ({
  data,
  userId,
}: addDepartmentUserProps): Promise<AddUserResponse> => {
  const response = await apiClient.post(
    `/user/org/user/${userId}/department`,
    { departmentId: data },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return CreateUserResponseSchema.parse(response);
};

export type useAddDepartmentUserProps = {
  onSuccess?: () => void;
  userId: string;
};

export const useAddDepartmentUser = ({
  onSuccess,
  userId,
}: useAddDepartmentUserProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: addDepartmentUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.user.department(userId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.user.departmentAll(userId),
        {
          ignore_userId: userId,
        },
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
