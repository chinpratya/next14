import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const addTemplateRiskLikelihood = async (
  data: Record<string, unknown>,
  assessmentId: string
): Promise<void> =>
  await apiClient.post(
    `/assessment/${assessmentId}/likelihood`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseAddTemplateRiskLikelihood = {
  onSuccess?: () => void;
  assessmentId: string;
};

export const useAddTemplateRiskLikelihood = ({
  onSuccess,
  assessmentId,
}: UseAddTemplateRiskLikelihood) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      addTemplateRiskLikelihood(data, assessmentId),
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
