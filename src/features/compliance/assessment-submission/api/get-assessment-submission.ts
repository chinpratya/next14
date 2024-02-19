import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionInfoSchema } from '../schemas';
import { AssessmentSubmissionInfo } from '../types';

export const getAssessmentSubmission = async (
  assessmentId: string
): Promise<AssessmentSubmissionInfo> => {
  const { data } = await apiClient.get(
    `/assignment-submission/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentSubmissionInfoSchema.parse(data);
};

export const useGetAssessmentSubmission = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.detail(
          assessmentId
        ),
      ],
      queryFn: () =>
        getAssessmentSubmission(assessmentId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
