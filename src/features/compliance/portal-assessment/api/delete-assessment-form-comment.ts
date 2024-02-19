import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const deleteAssessmentFormComment = (
  assessmentId: string,
  formId: string,
  commentId: string
) =>
  apiClient.delete(
    `/portal/assessment/${assessmentId}/form/${formId}/comment/${commentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseDeleteAssessmentFormComment = {
  assessmentId: string;
  formId: string;
  onSuccess?: () => void;
};

export const useDeleteAssessmentFormComment = ({
  assessmentId,
  formId,
  onSuccess,
}: UseDeleteAssessmentFormComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (commentId: string) =>
      deleteAssessmentFormComment(
        assessmentId,
        formId,
        commentId
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
