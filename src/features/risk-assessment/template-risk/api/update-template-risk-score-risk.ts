import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTemplateRiskScoreRisk = async (
  data: Record<string, unknown>,
  assessmentId: string,
  scoreId: number
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/score/${scoreId}`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseUpdateTemplateRiskScoreRisk = {
  onSuccess?: () => void;
  assessmentId: string;
};

type payloadRisk = {
  data: Record<string, unknown>;
  scoreId: number;
};

export const useUpdateTemplateRiskScoreRisk = ({
  onSuccess,
  assessmentId,
}: UseUpdateTemplateRiskScoreRisk) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ data, scoreId }: payloadRisk) =>
      updateTemplateRiskScoreRisk(
        data,
        assessmentId,
        scoreId
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
