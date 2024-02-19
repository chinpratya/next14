import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ResultAssessmentSchema } from '../schemas/assessment';
import { ResultAssessment } from '../types/assessment';

export const getPortalAssessmentResultDetail = async (
  assessmentId: string
): Promise<ResultAssessment> => {
  const { data } = await apiClient.get(
    `/portal/assessment-approve-result/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return ResultAssessmentSchema.parse(data);
};

export type UseGetPortalAssessmentResultDetail = {
  assessmentId: string;
};

export const useGetPortalAssessmentResultDetail = ({
  assessmentId,
}: UseGetPortalAssessmentResultDetail) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.detail(
          assessmentId
        ),
      ],
      queryFn: () =>
        getPortalAssessmentResultDetail(assessmentId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
