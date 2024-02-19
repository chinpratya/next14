import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export type UpdateAssessmentFormCommentPayload = {
  commentId: string;
  message: string;
};

export const updateAssessmentFormComment = (
  assessmentId: string,
  formId: string,
  {
    commentId,
    message,
  }: UpdateAssessmentFormCommentPayload
) =>
  apiClient.put(
    `/portal/assessment/${assessmentId}/form/${formId}/comment/${commentId}`,
    {
      message,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseUpdateAssessmentFormComment = {
  assessmentId: string;
  formId: string;
  onSuccess?: () => void;
};

export const useUpdateAssessmentFormComment = ({
  assessmentId,
  formId,
  onSuccess,
}: UseUpdateAssessmentFormComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (
      payload: UpdateAssessmentFormCommentPayload
    ) =>
      updateAssessmentFormComment(
        assessmentId,
        formId,
        payload
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
