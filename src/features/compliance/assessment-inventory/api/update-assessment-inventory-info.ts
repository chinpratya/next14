import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

export const updateAssessmentInventoryInfo = async (
  assessmentId: string,
  data: Record<string, unknown>
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}`,
    data,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

export type UseUpdateAssessmentInventoryInfo = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useUpdateAssessmentInventoryInfo = ({
  assessmentId,
  onSuccess,
}: UseUpdateAssessmentInventoryInfo) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateAssessmentInventoryInfo(assessmentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.assessmentInventory.detail(
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
