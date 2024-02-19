import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { PortalAssessmentSchema } from '../schemas/assessment';
import { PortalAssessment } from '../types/assessment';

export const getApproverAssessment = async (
  assessmentId: string
): Promise<PortalAssessment> => {
  const { data } = await apiClient.get(
    `/portal/assessment-approve/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return PortalAssessmentSchema.parse(data);
};

export type UseGetApproverAssessment = {
  assessmentId: string;
};

export const useGetApproverAssessment = ({
  assessmentId,
}: UseGetApproverAssessment) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.detail(
          assessmentId
        ),
      ],
      queryFn: () => getApproverAssessment(assessmentId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
