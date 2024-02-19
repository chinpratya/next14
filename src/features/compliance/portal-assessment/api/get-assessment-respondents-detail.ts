import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { PortalAssessmentDetailResponsSchema } from '../schemas/report';
import { AssessmentRespondentsDetail } from '../types/report';

export const getAssessmentRespondentDetail = async (
  assessmentId: string,
  respondentId: string
): Promise<AssessmentRespondentsDetail> => {
  const data = await apiClient.get(
    `/portal/assessment/${assessmentId}/respondent/${respondentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return PortalAssessmentDetailResponsSchema.parse(data);
};

export const useGetAssessmentRespondentDetail = (
  assessmentId: string,
  respondentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.respondentDetail(
          assessmentId,
          respondentId
        ),
      ],
      queryFn: () =>
        getAssessmentRespondentDetail(
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
