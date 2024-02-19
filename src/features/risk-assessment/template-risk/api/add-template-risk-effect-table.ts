import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const addTemplateRiskEffectTable = async (
  data: Record<string, unknown>,
  assessmentId: string,
  effectId: string
): Promise<void> =>
  await apiClient.post(
    `/assessment/${assessmentId}/effect/${effectId}/table`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseAddTemplateRiskEffectTable = {
  onSuccess?: () => void;
  assessmentId: string;
};

type payloadEffectTableType = {
  effectId: string;
  data: Record<string, unknown>;
};

export const useAddTemplateRiskEffectTable = ({
  onSuccess,
  assessmentId,
}: UseAddTemplateRiskEffectTable) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      data,
      effectId,
    }: payloadEffectTableType) =>
      addTemplateRiskEffectTable(
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
