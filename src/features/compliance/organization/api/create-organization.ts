import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrgResponseSchema } from '../schemas';
import { createOrganizationResponse } from '../types';

export const createOrganization = async (
  data: Record<string, unknown>[]
): Promise<createOrganizationResponse> => {
  const response = await apiClient.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization`,
    { data }
  );
  return OrgResponseSchema.parse(response);
};

export type UseCreateOrganization = {
  onSuccess?: () => void;
};

export const useCreateOrganization = ({
  onSuccess,
}: UseCreateOrganization) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createOrganization,
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
