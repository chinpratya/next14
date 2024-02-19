import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTag = (tagId: string) =>
  // console.log(tagId);
  apiClient.delete(`/tag/${tagId}`, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

export type UseDeleteTag = {
  onSuccess?: () => void;
};

export const useDeleteTag = ({
  onSuccess,
}: UseDeleteTag) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTag,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        incidentManagementQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
