import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

// import { OrganizationUnitApproverRespondent } from '../types';

export type UpdateOrganizationUnitAssessmentApproverRespondent =
  {
    organizationId: string;
    instituteId: string;
    approverId: string;
    data: string[];
  };

export const updateOrganizationUnitAssessmentApproverRespondent =
  ({
    organizationId,
    instituteId,
    approverId,
    data,
  }: UpdateOrganizationUnitAssessmentApproverRespondent): Promise<void> => {
    return apiClient.put(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver/${approverId}/respondent`,
      { respondents: data }
    );
  };

export type UseUpdateOrganizationUnitAssessmentApproverRespondent =
  {
    organizationId: string;
    instituteId: string;
    approverId: string;
    onSuccess?: () => void;
  };

export const useUpdateOrganizationUnitAssessmentApproverRespondent =
  ({
    organizationId,
    instituteId,
    approverId,
    onSuccess,
  }: UseUpdateOrganizationUnitAssessmentApproverRespondent) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (data: string[]) =>
        updateOrganizationUnitAssessmentApproverRespondent(
          {
            organizationId,
            instituteId,
            approverId,
            data,
          }
        ),
      onSuccess: () => {
        queryClient.invalidateQueries();
        queryClient.invalidateQueries([
          complianceQueryKeys.organization.approverRespondent(
            organizationId,
            instituteId,
            approverId
          ),
        ]);
        onSuccess?.();
      },
    });

    return {
      submit: mutate,
      isLoading,
      isError,
    };
  };
