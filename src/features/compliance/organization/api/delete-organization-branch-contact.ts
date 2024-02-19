import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteOrganizationBranchContact = {
  organizationId: string;
  contactId: string;
  branchId: string;
};

export const deleteOrganizationBranchContact = ({
  organizationId,
  contactId,
  branchId,
}: DeleteOrganizationBranchContact): Promise<void> => {
  return apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${branchId}/contact/${contactId}`
  );
};

export type UseDeleteOrganizationBranchContact = {
  organizationId: string;
  branchId: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useDeleteOrganizationBranchContact = ({
  organizationId,
  branchId,
  page,
  pageSize,
  onSuccess,
}: UseDeleteOrganizationBranchContact) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (contactId: string) =>
      deleteOrganizationBranchContact({
        organizationId,
        contactId,
        branchId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.branchContact(
          organizationId,
          branchId
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
