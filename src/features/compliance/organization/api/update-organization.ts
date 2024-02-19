import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrganizationPayload } from '../types';

export type UpdateOrganization = {
  organizationId: string;
  data: OrganizationPayload;
};

export const updateOrganization = ({
  organizationId,
  data,
}: UpdateOrganization): Promise<void> => {
  return apiClient.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}`,
    data
  );
};

export type UseUpdateOrganization = {
  organizationId: string;
  onSuccess?: () => void;
};

export const useUpdateOrganization = ({
  organizationId,
  onSuccess,
}: UseUpdateOrganization) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.detail(
          organizationId
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
