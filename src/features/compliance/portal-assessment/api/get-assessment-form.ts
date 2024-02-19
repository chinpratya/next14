import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { WebformBuilderItem } from '../../share';

export const getAssessmentForm = async (
  assessmentId: string
): Promise<WebformBuilderItem[]> => {
  const { data } = await apiClient.get(
    `/portal/assessment/${assessmentId}/form`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return data;
};

export const useGetAssessmentForm = (
  assessmentId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.form(
          assessmentId
        ),
      ],
      queryFn: () => getAssessmentForm(assessmentId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
