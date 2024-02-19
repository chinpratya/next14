import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionRespondentDetailLogSchema } from '../schemas';
import { AssessmentSubmissionRespondentDetailLog } from '../types';

export const getAssessmentSubmissionRespondentLog =
  async (
    assessmentId: string,
    respondentId: string
  ): Promise<AssessmentSubmissionRespondentDetailLog> => {
    const { data } = await apiClient.get(
      `/assignment-submission/${assessmentId}/respondent/${respondentId}/log`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );

    return AssessmentSubmissionRespondentDetailLogSchema.parse(
      data
    );
  };

export const useGetAssessmentSubmissionRespondentLog = (
  assessmentId: string,
  respondentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.respondentLog(
          assessmentId,
          respondentId
        ),
      ],
      queryFn: () =>
        getAssessmentSubmissionRespondentLog(
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
