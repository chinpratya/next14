import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateMeasureForm = (
  measureId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/measured/${measureId}/form`, data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseUpdateMeasureForm = {
  measureId: string;
  onSuccess?: () => void;
};

export const useUpdateMeasureForm = ({
  measureId,
  onSuccess,
}: UseUpdateMeasureForm) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateMeasureForm(measureId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.all,
      ]);
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.form(measureId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
