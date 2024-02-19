import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionRankingResponse } from '../types';

export type GetAssessmentSubmissionRanking = {
  assessmentId: string;
  type: string;
  search?: string;
};
export const getAssessmentSubmissionRanking = ({
  assessmentId,
  type,
  search,
}: GetAssessmentSubmissionRanking): Promise<AssessmentSubmissionRankingResponse> => {
  return apiClient.get(
    `/assignment-submission/${assessmentId}/ranking?type=${type}&search=${search}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
};

export type UseGetAssessmentSubmissionRanking =
  GetAssessmentSubmissionRanking;

export const useGetAssessmentSubmissionRanking = ({
  assessmentId,
  type,
  search = '',
}: UseGetAssessmentSubmissionRanking) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.ranking(
          assessmentId,
          type,
          search
        ),
      ],
      queryFn: () =>
        getAssessmentSubmissionRanking({
          assessmentId,
          type,
          search,
        }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
