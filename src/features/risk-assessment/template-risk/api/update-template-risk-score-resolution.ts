import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTemplateRiskScoreResolution = async (
  data: Record<string, unknown>,
  assessmentId: string
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/score/resolution`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseUpdateTemplateRiskScoreResolution = {
  onSuccess?: () => void;
  assessmentId: string;
};

export const useUpdateTemplateRiskScoreResolution = ({
  onSuccess,
  assessmentId,
}: UseUpdateTemplateRiskScoreResolution) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTemplateRiskScoreResolution(
        data,
        assessmentId
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.score(
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
