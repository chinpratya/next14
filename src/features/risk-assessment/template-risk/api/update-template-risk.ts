import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTemplateRisk = (
  assessmentId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/assessment/${assessmentId}`, data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseUpdateTemplateRisk = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useUpdateTemplateRisk = ({
  assessmentId,
  onSuccess,
}: UseUpdateTemplateRisk) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTemplateRisk(assessmentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.all,
      ]);
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.detail(
          assessmentId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
