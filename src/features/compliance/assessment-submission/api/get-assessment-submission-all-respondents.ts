import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { AssessmentSubmissionAllRespondentSchema } from '../schemas';
import { AssessmentSubmissionAllRespondent } from '../types';

export const getAssessmentSubmissionAllRespondents =
  async (): Promise<AssessmentSubmissionAllRespondent> => {
    const { data } = await apiClient.get(
      `/setting/organization/all-respondent`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );
    return AssessmentSubmissionAllRespondentSchema.parse(
      data
    );
  };

export const useGetAssessmentSubmissionAllRespondents =
  () => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.assessmentSubmission
            .respondent,
        ],
        queryFn: () =>
          getAssessmentSubmissionAllRespondents(),
      });
    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
