import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { AssessmentResponseSchema } from '../schemas';
import {
  createAssessmentResponse,
  createAssessmentPayload,
} from '../types';

export const importAssessmentInventory = async (
  data: createAssessmentPayload[]
): Promise<createAssessmentResponse> => {
  const response = await apiClient.post(
    `/assessment/excel`,
    data,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
  return AssessmentResponseSchema.parse(response);
};

export type UseImportAssessmentInventoryProps = {
  onSuccess?: () => void;
};

export const useImportAssessmentInventory = ({
  onSuccess,
}: UseImportAssessmentInventoryProps) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: importAssessmentInventory,
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
