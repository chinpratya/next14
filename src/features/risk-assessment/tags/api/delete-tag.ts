import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTag = (tagId: string) =>
  apiClient.delete(`/tag/${tagId}`, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
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
        riskAssessmentQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
