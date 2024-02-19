import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const createAssessmentFormComment = (
  assessmentId: string,
  formId: string,
  message: string
) =>
  apiClient.post(
    `/portal/assessment/${assessmentId}/form/${formId}/comment`,
    {
      message,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseCreateAssessmentFormComment = {
  assessmentId: string;
  formId: string;
  onSuccess?: () => void;
};

export const useCreateAssessmentFormComment = ({
  assessmentId,
  formId,
  onSuccess,
}: UseCreateAssessmentFormComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (message: string) =>
      createAssessmentFormComment(
        assessmentId,
        formId,
        message
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.comment(
          assessmentId,
          formId
        ),
      ]);
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.issue(
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
