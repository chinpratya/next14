import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTemplateRiskLikelihood = (
  assessmentId: string,
  likelihoodId: number
) =>
  apiClient.delete(
    `/assessment/${assessmentId}/likelihood/${likelihoodId}`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseDeleteTemplateRiskLikelihood = {
  onSuccess?: () => void;
  assessmentId: string;
};

export const useDeleteTemplateRiskLikelihood = ({
  onSuccess,
  assessmentId,
}: UseDeleteTemplateRiskLikelihood) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (likelihoodId: number) =>
      deleteTemplateRiskLikelihood(
        assessmentId,
        likelihoodId
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.chance(
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
