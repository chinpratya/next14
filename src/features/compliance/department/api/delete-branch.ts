import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { settingQueryKeys } from '@/lib/queryKeys/setting';
import { queryClient } from '@/lib/react-query';

export type DeleteBranch = {
  organizationId: string;
  instituteId: string;
};

export const deleteBranch = ({
  organizationId,
  instituteId,
}: DeleteBranch): Promise<void> => {
  return apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}`
  );
};

export type UseDeleteBranch = {
  onSuccess?: () => void;
};

export const useDeleteBranch = ({
  onSuccess,
}: UseDeleteBranch) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (payload: DeleteBranch) =>
      deleteBranch(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        settingQueryKeys.organization.branch,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
