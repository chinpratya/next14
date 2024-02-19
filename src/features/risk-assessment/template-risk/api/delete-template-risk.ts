import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTemplateRisk = (
  assessmentId: string
) =>
  apiClient.delete(`/assessment/${assessmentId}`, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseDeleteTemplateRisk = {
  onSuccess?: () => void;
};

export const useDeleteTemplateRisk = ({
  onSuccess,
}: UseDeleteTemplateRisk) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (assessmentId: string) =>
      deleteTemplateRisk(assessmentId),
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
