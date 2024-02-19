import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { ListPortalAssessmentResponse } from '../types/assessment';

export type ListApproveAssessment = {
  status?: string;
};

export const listApproveAssessment = ({
  status,
}: ListApproveAssessment): Promise<ListPortalAssessmentResponse> => {
  return apiClient.get(`/portal/assessment-approve`, {
    baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    params: {
      status,
    },
  });
};

export type UseListApproveAssessment = {
  status?: string;
};

export const useListApproveAssessment = ({
  status,
}: UseListApproveAssessment = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.all(status),
      ],
      queryFn: () => listApproveAssessment({ status }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
