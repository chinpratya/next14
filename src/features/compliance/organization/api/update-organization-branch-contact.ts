import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrganizationContact } from '../types';

export type UpdateOrganizationBranchContact = {
  organizationId: string;
  branchId: string;
  data: OrganizationContact;
};

export const updateOrganizationBranchContact = ({
  organizationId,
  branchId,
  data,
}: UpdateOrganizationBranchContact): Promise<void> => {
  return apiClient.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${branchId}/contact/${data.ObjectUUID}`,
    data
  );
};

export type UseUpdateOrganizationBranchContact = {
  organizationId: string;
  contactId: string;
  branchId: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useUpdateOrganizationBranchContact = ({
  organizationId,
  contactId,
  branchId,
  page,
  pageSize,
  onSuccess,
}: UseUpdateOrganizationBranchContact) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: OrganizationContact) =>
      updateOrganizationBranchContact({
        organizationId,
        branchId,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.branchDetailContact(
          organizationId,
          contactId,
          branchId
        ),
      ]);
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
