import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { CommentResponeSchema } from '../schemas/comment';
import { CommentRespone } from '../types/comment';

export const countPortalFormUnreadComment = async (
  assessmentId: string,
  formId: string
): Promise<CommentRespone> => {
  const response = await apiClient.get(
    `/portal/assessment/${assessmentId}/form/${formId}/comment-count`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return CommentResponeSchema.parse(response);
};

export type UseCountPortalFormUnreadComment = {
  assessmentId: string;
  formId: string;
};

export const useCountPortalFormUnreadComment = ({
  assessmentId,
  formId,
}: UseCountPortalFormUnreadComment) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      enabled: !!assessmentId && !!formId,
      queryKey: [
        compliancePortalQueryKeys.assessment.commentCount(
          assessmentId,
          formId
        ),
      ],
      queryFn: () =>
        countPortalFormUnreadComment(
          assessmentId,
          formId
        ),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
