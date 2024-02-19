import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const addTemplateRiskEffect = async (
  data: Record<string, unknown>,
  assessmentId: string
): Promise<void> =>
  await apiClient.post(
    `/assessment/${assessmentId}/effect`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseAddTemplateRiskEffect = {
  onSuccess?: () => void;
  assessmentId: string;
};

export const useAddTemplateRiskEffect = ({
  onSuccess,
  assessmentId,
}: UseAddTemplateRiskEffect) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      addTemplateRiskEffect(data, assessmentId),
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
