import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

export const updateAssessmentInventoryLogic = async (
  assessmentId: string,
  logics: Array<Record<string, unknown>>
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/logic`,
    {
      logics,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

export type UseUpdateAssessmentInventoryLogic = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useUpdateAssessmentInventoryLogic = ({
  assessmentId,
  onSuccess,
}: UseUpdateAssessmentInventoryLogic) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Array<Record<string, unknown>>) =>
      updateAssessmentInventoryLogic(assessmentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.assessmentInventory.form(
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
