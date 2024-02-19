import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTemplateRiskLikelihood = async (
  data: Record<string, unknown>,
  assessmentId: string,
  likelihoodId: number
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/likelihood/${likelihoodId}`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseUpdateTemplateRiskLikelihood = {
  onSuccess?: () => void;
  assessmentId: string;
  likelihoodId: number;
};

export const useUpdateTemplateRiskLikelihood = ({
  onSuccess,
  assessmentId,
  likelihoodId,
}: UseUpdateTemplateRiskLikelihood) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTemplateRiskLikelihood(
        data,
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
