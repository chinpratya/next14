import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createGroup = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/group`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

type UseCreateGroup = {
  onSuccess?: () => void;
};

export const useCreateGroup = ({
  onSuccess,
}: UseCreateGroup) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.group.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
