import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

import { AssessmentResponseSchema } from '../schemas';
import { createAssessmentResponse } from '../types';

export const deleteFilesAssessmentInventoryInfo = async (
  assessmentId: string,
  fileID: string
): Promise<createAssessmentResponse> => {
  const response = await apiClient.delete(
    `/assessment/${assessmentId}/file/${fileID}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentResponseSchema.parse(response);
};

export type UseDeleteFileAssessmentInventoryInfo = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useDeleteFileAssessmentInventoryInfo = ({
  assessmentId,
  onSuccess,
}: UseDeleteFileAssessmentInventoryInfo) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (fileID: string) =>
      deleteFilesAssessmentInventoryInfo(
        assessmentId,
        fileID
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.assessmentInventory.detail(
          assessmentId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
