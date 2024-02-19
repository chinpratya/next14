import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { PortalIssueResponseSchema } from '../schemas/assessment';
import { PortalIssueType } from '../types/assessment';

export const getAssessmentIssue = async (
  assessmentId: string
): Promise<PortalIssueType> => {
  const resp = await apiClient.get(
    `/portal/assessment/${assessmentId}/issue`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return PortalIssueResponseSchema.parse(resp);
};

export const useGetAssessmentIssue = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.issue(
          assessmentId
        ),
      ],
      queryFn: () => getAssessmentIssue(assessmentId),
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
