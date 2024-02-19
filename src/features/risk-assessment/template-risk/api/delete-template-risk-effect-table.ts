import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTemplateRiskEffectTable = (
  assessmentId: string,
  effectId: number,
  tableId: string
) =>
  apiClient.delete(
    `/assessment/${assessmentId}/effect/${effectId}/table/${tableId}`,
    {
      baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
    }
  );

export type UseDeleteTemplateRiskEffectTable = {
  onSuccess?: () => void;
  assessmentId: string;
};

type payloadEffectTableType = {
  effectId: number;
  tableId: string;
};
export const useDeleteTemplateRiskEffectTable = ({
  onSuccess,
  assessmentId,
}: UseDeleteTemplateRiskEffectTable) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      effectId,
      tableId,
    }: payloadEffectTableType) =>
      deleteTemplateRiskEffectTable(
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
