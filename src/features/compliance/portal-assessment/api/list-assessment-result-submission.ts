import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ResultAssessmentResponseSchema } from '../schemas/assessment';
import { ResultResponseAssessment } from '../types/assessment';

export const listAssessmentResultSubmission =
  async (): Promise<ResultResponseAssessment> => {
    const response = await apiClient.get(
      `/portal/assessment-result`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
      }
    );

    return ResultAssessmentResponseSchema.parse(response);
  };

export const useListAssessmentResultSubmission = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [compliancePortalQueryKeys.result.all],
      queryFn: () => listAssessmentResultSubmission(),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
