import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ListPortalAssessmentResponseSchema } from '../schemas/report';
import { AssessmentRespondentsReport } from '../types/report';

export const getAssessmentRespondents = async (
  assessmentId: string
): Promise<AssessmentRespondentsReport> => {
  const data = await apiClient.get(
    `/portal/assessment/${assessmentId}/respondent`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return ListPortalAssessmentResponseSchema.parse(data);
};

export const useGetAssessmentRespondents = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.respondents(
          assessmentId
        ),
      ],
      queryFn: () =>
        getAssessmentRespondents(assessmentId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
