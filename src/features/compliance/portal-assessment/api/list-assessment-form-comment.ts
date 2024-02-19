import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { CommentSchema } from '../schemas/comment';
import { Comment } from '../types/comment';

export const listAssessmentFormComment = async (
  assessmentId: string,
  formId: string
): Promise<Comment[]> => {
  const { data } = await apiClient.get(
    `/portal/assessment/${assessmentId}/form/${formId}/comment`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return z.array(CommentSchema).parse(data);
};

export type UseListAssessmentFormComment = {
  assessmentId: string;
  formId: string;
};

export const useListAssessmentFormComment = ({
  assessmentId,
  formId,
}: UseListAssessmentFormComment) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.comment(
          assessmentId,
          formId
        ),
      ],
      queryFn: () =>
        listAssessmentFormComment(assessmentId, formId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
