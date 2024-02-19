import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteOrganizationContact = {
  organizationId: string;
  contactId: string;
};

export const deleteOrganizationContact = ({
  organizationId,
  contactId,
}: DeleteOrganizationContact): Promise<void> => {
  return apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/contact/${contactId}`
  );
};

export type UseDeleteOrganizationContact = {
  organizationId: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useDeleteOrganizationContact = ({
  organizationId,
  page,
  pageSize,
  onSuccess,
}: UseDeleteOrganizationContact) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (contactId: string) =>
      deleteOrganizationContact({
        organizationId,
        contactId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.contact(
          organizationId
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
