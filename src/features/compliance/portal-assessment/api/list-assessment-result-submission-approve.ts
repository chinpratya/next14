import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ResultAssessmentResponseSchema } from '../schemas/assessment';
import { ResultResponseAssessment } from '../types/assessment';

export const listAssessmentResultApproveSubmission =
  async (): Promise<ResultResponseAssessment> => {
    const response = await apiClient.get(
      `/portal/assessment-approve-result`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
      }
    );

    return ResultAssessmentResponseSchema.parse(response);
  };

export const useListAssessmentResultApproveSubmission =
  () => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [compliancePortalQueryKeys.result.all],
        queryFn: () =>
          listAssessmentResultApproveSubmission(),
      });
    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
