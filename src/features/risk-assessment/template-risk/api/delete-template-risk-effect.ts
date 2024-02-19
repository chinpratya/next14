import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTemplateRiskEffect = (
  assessmentId: string,
  effectId: number
) =>
  apiClient.delete(
    `/assessment/${assessmentId}/effect/${effectId}`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseDeleteTemplateRiskEffect = {
  onSuccess?: () => void;
  assessmentId: string;
};

export const useDeleteTemplateRiskEffect = ({
  onSuccess,
  assessmentId,
}: UseDeleteTemplateRiskEffect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (effectId: number) =>
      deleteTemplateRiskEffect(assessmentId, effectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.effect(
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
