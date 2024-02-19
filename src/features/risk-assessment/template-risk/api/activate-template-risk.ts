import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const activateTemplateRisk = (
  assessmentId: string
) =>
  apiClient.post(
    `${API_ENDPOINT_RISK_ASSESSMENT_BASE_URL}/assessment/${assessmentId}/activate`
  );

export type UseActivateTemplateRisk = {
  onSuccess?: () => void;
};

export const useActivateTemplateRisk = ({
  onSuccess,
}: UseActivateTemplateRisk) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (assessmentId: string) =>
      activateTemplateRisk(assessmentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
