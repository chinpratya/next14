import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteOrganizationUnit = {
  organizationId: string;
  instituteId: string;
};

export const deleteOrganizationUnit = ({
  organizationId,
  instituteId,
}: DeleteOrganizationUnit): Promise<void> => {
  return apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}`
  );
};

export type UseDeleteOrganizationUnit = {
  organizationId: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useDeleteOrganizationUnit = ({
  organizationId,
  page,
  pageSize,
  onSuccess,
}: UseDeleteOrganizationUnit) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (instituteId: string) =>
      deleteOrganizationUnit({
        organizationId,
        instituteId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.unit(
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
