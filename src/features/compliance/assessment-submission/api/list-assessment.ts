import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentResponseSchema } from '../schemas';
import { AssessmentResponse } from '../types';

export const listAssessments =
  async (): Promise<AssessmentResponse> => {
    const response = await apiClient.get(
      `/assessment?status=publish`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );

    return AssessmentResponseSchema.parse(response);
  };

export const useListAssessments = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [complianceQueryKeys.assessment.all],
      queryFn: () => listAssessments(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
