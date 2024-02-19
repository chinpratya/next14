import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionRespondentDetailCommentSchema } from '../schemas';
import { AssessmentSubmissionRespondentDetailComment } from '../types';

export const getAssessmentSubmissionRespondentComment =
  async (
    assessmentId: string,
    formId: string
  ): Promise<AssessmentSubmissionRespondentDetailComment> => {
    const { data } = await apiClient.get(
      `/assignment-submission/${assessmentId}/form/${formId}/comment`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );

    return AssessmentSubmissionRespondentDetailCommentSchema.parse(
      data
    );
  };

export const useListAssessmentSubmissionRespondentComment =
  (assessmentId: string, formId: string) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.assessmentSubmission.detailRespondentListComment(
            assessmentId,
            formId
          ),
        ],
        queryFn: () =>
          getAssessmentSubmissionRespondentComment(
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
