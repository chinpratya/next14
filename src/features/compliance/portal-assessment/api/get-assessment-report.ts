import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ReportResponseSchema } from '../schemas/report';
import { ReportResponse } from '../types/report';

export const getAssessmentReport = async (
  assessmentId: string
): Promise<ReportResponse> => {
  const report = await apiClient.get(
    `/portal/assessment/${assessmentId}/report`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return ReportResponseSchema.parse(report);
};

export const useGetAssessmentReport = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.report(
          assessmentId
        ),
      ],
      queryFn: () => getAssessmentReport(assessmentId),
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
