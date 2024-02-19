import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrgResponseSchema } from '../schemas';
import { deleteOrganizationResponse } from '../types';

export const deleteOrganization = async (
  orgId: string | null
): Promise<deleteOrganizationResponse> => {
  const response = await apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${orgId}`
  );
  return OrgResponseSchema.parse(response);
};

type useDeleteOrganizationPayload = {
  onSuccess?: () => void;
};
export const useDeleteOrganization = ({
  onSuccess,
}: useDeleteOrganizationPayload) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
