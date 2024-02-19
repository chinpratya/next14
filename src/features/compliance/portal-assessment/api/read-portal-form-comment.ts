import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const readPortalFormComment = (
  assessmentId: string,
  formId: string
) =>
  apiClient.get(
    `/portal/assessment/${assessmentId}/form/${formId}/comment-read`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseReadPortalFormComment = {
  assessmentId: string;
  formId: string;
};

export const useReadPortalFormComment = ({
  assessmentId,
  formId,
}: UseReadPortalFormComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      readPortalFormComment(assessmentId, formId),
    onSuccess: () => {
      queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.commentCount(
          assessmentId,
          formId
        ),
      ]);
      queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.issue(
          assessmentId
        ),
      ]);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
