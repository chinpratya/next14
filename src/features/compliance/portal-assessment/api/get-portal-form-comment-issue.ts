import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { CommentIssueSchema } from '../schemas/comment';
import { CommentIssue } from '../types/comment';

export const getPortalFormCommentIssue = async (
  assessmentId: string,
  formId: string
): Promise<CommentIssue> => {
  const response = await apiClient.get(
    `/portal/assessment/${assessmentId}/form/${formId}/issue`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return CommentIssueSchema.parse(response);
};

export type UseGetPortalFormCommentIssue = {
  assessmentId: string;
  formId: string;
};

export const useGetPortalFormCommentIssue = ({
  assessmentId,
  formId,
}: UseGetPortalFormCommentIssue) => {
  const { data, isLoading, isError } = useQuery({
    enabled: !!assessmentId && !!formId,
    queryKey: [
      compliancePortalQueryKeys.assessment.commentIssue(
        assessmentId,
        formId
      ),
    ],
    queryFn: () =>
      getPortalFormCommentIssue(assessmentId, formId),
  });
  return {
    data,
    isLoading,
    isError,
  };
};
