import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { AssessmentResponseSchema } from '../schemas';
import { DeleteAssessmentResponse } from '../types';

export const deleteAssessmentInventory = async (
  inventoryId: string | null
): Promise<DeleteAssessmentResponse> => {
  const response = await apiClient.delete(
    `/assessment/${inventoryId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
  return AssessmentResponseSchema.parse(response);
};

type UseDeleteAssessmentInventoryProps = {
  onSuccess?: () => void;
};
export const useDeleteAssessmentInventory = ({
  onSuccess,
}: UseDeleteAssessmentInventoryProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteAssessmentInventory,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
