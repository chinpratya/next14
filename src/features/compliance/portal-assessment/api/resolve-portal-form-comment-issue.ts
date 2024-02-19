import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const resolvePortalFormCommentIssue = (
  assessmentId: string,
  formId: string
) =>
  apiClient.post(
    `/portal/assessment/${assessmentId}/form/${formId}/issue/resolve`,
    {},
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseResolvePortalFormCommentIssue = {
  assessmentId: string;
  formId: string;
};

export const useResolvePortalFormCommentIssue = ({
  assessmentId,
  formId,
}: UseResolvePortalFormCommentIssue) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () =>
      resolvePortalFormCommentIssue(assessmentId, formId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.commentIssue(
          assessmentId,
          formId
        ),
      ]);
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.issue(
          assessmentId
        ),
      ]);
    },
  });
  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
