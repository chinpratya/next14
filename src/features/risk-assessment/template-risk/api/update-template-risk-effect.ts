import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTemplateRiskEffect = async (
  data: Record<string, unknown>,
  assessmentId: string,
  effectId?: string
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/effect/${effectId}`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseUpdateTemplateRiskEffect = {
  onSuccess?: () => void;
  assessmentId: string;
  effectId?: string;
};

export const useUpdateTemplateRiskEffect = ({
  onSuccess,
  assessmentId,
  effectId,
}: UseUpdateTemplateRiskEffect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTemplateRiskEffect(
        data,
        assessmentId,
        effectId
      ),
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
