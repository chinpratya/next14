import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type deleteDepartmentUserProps = {
  userId: string | null;
  departmentId: string;
};

export const deleteDepartmentUser = async ({
  userId,
  departmentId,
}: deleteDepartmentUserProps): Promise<void> =>
  await apiClient.delete(
    `/user/org/user/${userId}/department/${departmentId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseDeleteDepartmentUser = {
  onSuccess?: (message: string) => void;
  userId: string;
};

export const useDeleteDepartmentUser = ({
  onSuccess,
  userId,
}: UseDeleteDepartmentUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteDepartmentUser,
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
      onSuccess?.('ลบองค์กรเรียบร้อยแล้ว');
    },
  });

  return { submit: mutate, isLoading };
};
