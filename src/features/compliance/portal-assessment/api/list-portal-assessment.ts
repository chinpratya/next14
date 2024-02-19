import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ListPortalAssessmentResponseSchema } from '../schemas/assessment';
import { ListPortalAssessmentResponse } from '../types/assessment';

export type ListPortalAssessment = {
  status?: string;
};
export const listPortalAssessment = async ({
  status,
}: ListPortalAssessment): Promise<ListPortalAssessmentResponse> => {
  const response = await apiClient.get(
    `/portal/assessment`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
      params: {
        status,
      },
    }
  );

  return ListPortalAssessmentResponseSchema.parse(
    response
  );
};

export type UseListPortalAssessment = {
  status?: string;
};

export const useListPortalAssessment = ({
  status,
}: UseListPortalAssessment = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.all(status),
      ],
      queryFn: () => listPortalAssessment({ status }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
