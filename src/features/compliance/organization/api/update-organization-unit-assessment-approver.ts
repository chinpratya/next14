import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrganizationUnitApprover } from '../types';

export type UpdateOrganizationUnitAssessmentApprover = {
  organizationId: string;
  instituteId: string;
  data: OrganizationUnitApprover;
};

export const updateOrganizationUnitAssessmentApprover = ({
  organizationId,
  instituteId,
  data,
}: UpdateOrganizationUnitAssessmentApprover): Promise<void> => {
  return apiClient.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver/${data.ObjectUUID}`,
    data
  );
};

export type UseUpdateOrganizationUnitAssessmentApprover =
  {
    organizationId: string;
    instituteId: string;
    approverId: string;
    onSuccess?: () => void;
  };

export const useUpdateOrganizationUnitAssessmentApprover =
  ({
    organizationId,
    instituteId,
    approverId,
    onSuccess,
  }: UseUpdateOrganizationUnitAssessmentApprover) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (data: OrganizationUnitApprover) =>
        updateOrganizationUnitAssessmentApprover({
          organizationId,
          instituteId,
          data,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries([
          complianceQueryKeys.organization.approver(
            organizationId,
            instituteId
          ),
        ]);
        queryClient.invalidateQueries([
          complianceQueryKeys.organization.detailApprover(
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
