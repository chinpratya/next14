import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateGroup = {
  groupId: string;
  data: Record<string, unknown>;
};

export const updateGroup = async ({
  data,
  groupId,
}: UpdateGroup): Promise<void> => {
  return apiClient.put(`/group/${groupId}`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseUpdateGroup = {
  groupId: string;
  onSuccess?: () => void;
};

export const useUpdateGroup = ({
  groupId,
  onSuccess,
}: UseUpdateGroup) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateGroup({ groupId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        dataMappingQueryKeys.group.detail(groupId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
