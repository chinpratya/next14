import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrganizationContact } from '../types';

export type UpdateOrganizationContact = {
  organizationId: string;
  data: OrganizationContact;
};

export const updateOrganizationContact = ({
  organizationId,
  data,
}: UpdateOrganizationContact): Promise<void> => {
  return apiClient.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/contact/${data.ObjectUUID}`,
    data
  );
};

export type UseUpdateOrganizationContact = {
  organizationId: string;
  contactId: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useUpdateOrganizationContact = ({
  organizationId,
  contactId,
  page,
  pageSize,
  onSuccess,
}: UseUpdateOrganizationContact) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: OrganizationContact) =>
      updateOrganizationContact({
        organizationId,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.detailContact(
          organizationId,
          contactId
        ),
      ]);
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
