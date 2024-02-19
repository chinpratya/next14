import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

export const deleteGroup = async (
  groupId: string
): Promise<void> => {
  return apiClient.delete(`/group/${groupId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseDeleteGroup = {
  onSuccess?: () => void;
};

export const useDeleteGroup = ({
  onSuccess,
}: UseDeleteGroup) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.group.all,
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
