import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrganizationUnitPayload } from '../types';

export type UpdateOrganizationUnit = {
  organizationId: string;
  instituteId: string;
  data: OrganizationUnitPayload;
};

export const updateOrganizationUnit = ({
  organizationId,
  instituteId,
  data,
}: UpdateOrganizationUnit): Promise<void> => {
  return apiClient.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}`,
    data
  );
};

export type UseUpdateOrganizationUnit = {
  organizationId: string;
  instituteId: string;
  onSuccess?: () => void;
};

export const useUpdateOrganizationUnit = ({
  organizationId,
  instituteId,
  onSuccess,
}: UseUpdateOrganizationUnit) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateOrganizationUnit,
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.detailUnit(
          organizationId,
          instituteId
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
