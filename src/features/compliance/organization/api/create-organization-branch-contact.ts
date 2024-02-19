import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createOrganizationBranchContact = (
  organizationId: string,
  branchId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${branchId}/contact`,
    data
  );
};

export type UseCreateOrganizationBranchContact = {
  organizationId: string;
  branchId: string;
  onSuccess?: () => void;
};

export const useCreateOrganizationBranchContact = ({
  organizationId,
  branchId,
  onSuccess,
}: UseCreateOrganizationBranchContact) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createOrganizationBranchContact(
        organizationId,
        branchId,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.branchContact(
          organizationId,
          branchId
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
