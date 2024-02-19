import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

import { AssessmentResponseSchema } from '../schemas';
import {
  createAssessmentResponse,
  FileType,
} from '../types';

export const addFilesAssessmentInventoryInfo = async (
  assessmentId: string,
  data: FileType
): Promise<createAssessmentResponse> => {
  const response = await apiClient.post(
    `/assessment/${assessmentId}/file`,
    data,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentResponseSchema.parse(response);
};

export type UseAddFileAssessmentInventoryInfo = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useAddFileAssessmentInventoryInfo = ({
  assessmentId,
  onSuccess,
}: UseAddFileAssessmentInventoryInfo) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: FileType) =>
      addFilesAssessmentInventoryInfo(assessmentId, data),
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
