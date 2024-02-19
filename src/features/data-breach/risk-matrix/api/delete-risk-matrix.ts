import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteRiskMatrix = (riskMatrixId: string) =>
  apiClient.delete(`/riskassessment/${riskMatrixId}`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseDeleteRiskMatrix = {
  onSuccess?: () => void;
};
export const useDeleteRiskMatrix = ({
  onSuccess,
}: UseDeleteRiskMatrix) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (riskMatrixId: string) =>
      deleteRiskMatrix(riskMatrixId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.riskMatrix.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
