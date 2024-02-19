import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionRespondentDetailFormSchema } from '../schemas';
import { AssessmentSubmissionRespondentDetailForm } from '../types';

export const getAssessmentSubmissionRespondentForm =
  async (
    assessmentId: string,
    respondentId: string
  ): Promise<AssessmentSubmissionRespondentDetailForm> => {
    const { data } = await apiClient.get(
      `/assignment-submission/${assessmentId}/respondent/${respondentId}/form`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );

    return AssessmentSubmissionRespondentDetailFormSchema.parse(
      data
    );
  };

export const useGetAssessmentSubmissionRespondentForm = (
  assessmentId: string,
  respondentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.detailRespondentForm(
          assessmentId,
          respondentId
        ),
      ],
      queryFn: () =>
        getAssessmentSubmissionRespondentForm(
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
