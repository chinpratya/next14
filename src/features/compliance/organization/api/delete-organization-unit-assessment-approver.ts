import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteOrganizationUnitAssessmentApprover = {
  organizationId: string;
  instituteId: string;
  approverId: string;
};

export const deleteOrganizationUnitAssessmentApprover = ({
  organizationId,
  instituteId,
  approverId,
}: DeleteOrganizationUnitAssessmentApprover): Promise<void> => {
  return apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver/${approverId}`
  );
};

export type UseDeleteOrganizationUnitAssessmentApprover =
  {
    organizationId: string;
    instituteId: string;
    page: number;
    pageSize: number;
    onSuccess?: () => void;
  };

export const useDeleteOrganizationUnitAssessmentApprover =
  ({
    organizationId,
    instituteId,
    page,
    pageSize,
    onSuccess,
  }: UseDeleteOrganizationUnitAssessmentApprover) => {
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: (approverId: string) =>
        deleteOrganizationUnitAssessmentApprover({
          organizationId,
          instituteId,
          approverId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries([
          complianceQueryKeys.organization.approver(
            organizationId,
            instituteId
          ),
          page,
          pageSize,
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
