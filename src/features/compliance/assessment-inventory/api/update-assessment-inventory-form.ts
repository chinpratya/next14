import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

export const updateAssessmentInventoryForm = async (
  assessmentId: string,
  form: Array<Record<string, unknown>>
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/form`,
    {
      form,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

export type UseUpdateAssessmentInventoryForm = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useUpdateAssessmentInventoryForm = ({
  assessmentId,
  onSuccess,
}: UseUpdateAssessmentInventoryForm) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (form: Array<Record<string, unknown>>) =>
      updateAssessmentInventoryForm(assessmentId, form),
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
