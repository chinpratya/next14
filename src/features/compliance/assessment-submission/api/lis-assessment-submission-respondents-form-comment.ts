import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

export const getAssessmentSubmissionRespondentFormComment =
  async (assessmentId: string): Promise<string[]> => {
    const { data } = await apiClient.get(
      `/assignment-submission/${assessmentId}/form-unread`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );

    return z.array(z.string()).parse(data);
  };

export const useListAssessmentSubmissionRespondentFormComment =
  (assessmentId: string) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.assessmentSubmission.detailRespondentFormComment(
            assessmentId
          ),
        ],
        queryFn: () =>
          getAssessmentSubmissionRespondentFormComment(
            assessmentId
          ),
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
