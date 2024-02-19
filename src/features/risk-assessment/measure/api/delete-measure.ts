import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteMeasure = (measureId: string) =>
  apiClient.delete(`/measured/${measureId}`, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseDeleteMeasure = {
  onSuccess?: () => void;
};

export const useDeleteMeasure = ({
  onSuccess,
}: UseDeleteMeasure) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (measureId: string) =>
      deleteMeasure(measureId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
