import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

export const updateAssessmentInventoryScore = async (
  assessmentId: string,
  form: Array<Record<string, unknown>>
): Promise<void> =>
  apiClient.put(
    `/assessment/${assessmentId}/score`,
    {
      form,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

export type UseUpdateAssessmentInventoryScore = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useUpdateAssessmentInventoryScore = ({
  assessmentId,
  onSuccess,
}: UseUpdateAssessmentInventoryScore) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Array<Record<string, unknown>>) =>
      updateAssessmentInventoryScore(assessmentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.assessmentInventory.score(
          assessmentId
        ),
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
