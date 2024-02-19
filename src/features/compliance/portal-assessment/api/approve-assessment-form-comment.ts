import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const approveAssessmentFormComment = (
  assessmentId: string,
  formId: string,
  commentId: string
) =>
  apiClient.post(
    `/portal/assessment/${assessmentId}/form/${formId}/comment/${commentId}/resolve`,
    {},
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseApproveAssessmentFormComment = {
  assessmentId: string;
  formId: string;
  onSuccess?: () => void;
};

export const useApproveAssessmentFormComment = ({
  assessmentId,
  formId,
  onSuccess,
}: UseApproveAssessmentFormComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (commentId: string) =>
      approveAssessmentFormComment(
        assessmentId,
        formId,
        commentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.commentCount(
          assessmentId,
          formId
        ),
      ]);
      queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.comment(
          assessmentId,
          formId
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
