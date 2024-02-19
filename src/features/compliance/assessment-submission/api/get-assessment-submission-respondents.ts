import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionRespondentDetailSchema } from '../schemas';
import { AssessmentSubmissionRespondentDetail } from '../types';

export const getAssessmentSubmissionRespondent = async (
  assessmentId: string,
  respondentId: string
): Promise<AssessmentSubmissionRespondentDetail> => {
  const { data } = await apiClient.get(
    `/assignment-submission/${assessmentId}/respondent/${respondentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentSubmissionRespondentDetailSchema.parse(
    data
  );
};

export const useGetAssessmentSubmissionRespondent = (
  assessmentId: string,
  respondentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.detailRespondent(
          assessmentId,
          respondentId
        ),
      ],
      queryFn: () =>
        getAssessmentSubmissionRespondent(
          assessmentId,
          respondentId
        ),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
