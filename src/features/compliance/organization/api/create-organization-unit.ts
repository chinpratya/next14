import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createOrganizationUnit = (
  organizationId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch`,
    data
  );
};

export type UseCreateOrganizationUnit = {
  organizationId: string;
  onSuccess?: () => void;
};

export const useCreateOrganizationUnit = ({
  organizationId,
  onSuccess,
}: UseCreateOrganizationUnit) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createOrganizationUnit(organizationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.unit(
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
