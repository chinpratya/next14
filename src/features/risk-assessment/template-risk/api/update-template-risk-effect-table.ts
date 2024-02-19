import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTemplateRiskEffectTable = async (
  data: Record<string, unknown>,
  assessmentId: string,
  effectId: string,
  tableId: number
): Promise<void> =>
  await apiClient.put(
    `/assessment/${assessmentId}/effect/${effectId}/table/${tableId}`,
    data,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseUpdateTemplateRiskEffectTable = {
  onSuccess?: () => void;
  assessmentId: string;
};

type payloadEffectTableType = {
  effectId: string;
  tableId: number;
  data: Record<string, unknown>;
};

export const useUpdateTemplateRiskEffectTable = ({
  onSuccess,
  assessmentId,
}: UseUpdateTemplateRiskEffectTable) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      data,
      effectId,
      tableId,
    }: payloadEffectTableType) =>
      updateTemplateRiskEffectTable(
        data,
        assessmentId,
        effectId,
        tableId
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
