import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const duplicateTemplateRisk = (
  assessmentId: string
) =>
  apiClient.put(
    `${API_ENDPOINT_RISK_ASSESSMENT_BASE_URL}/assessment/${assessmentId}/duplicate`
  );

export type UseDuplicateTemplateRisk = {
  onSuccess?: () => void;
};

export const useDuplicateTemplateRisk = ({
  onSuccess,
}: UseDuplicateTemplateRisk) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (assessmentId: string) =>
      duplicateTemplateRisk(assessmentId),
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
