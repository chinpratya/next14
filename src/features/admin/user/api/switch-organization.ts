import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { SwitchOrganizationResponseSchema } from '../schemas';
import { SwitchOrganizationResponse } from '../types';

type Payload = {
  departmentId: string;
  refresh_token: string;
};

export const switchOrganization = async (
  data: Payload
): Promise<SwitchOrganizationResponse> => {
  const response = await apiClient.post(
    `/user/auth/org`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return SwitchOrganizationResponseSchema.parse(
    response.data
  );
};

export type UseSwitchOrganization = {
  onSuccess?: (data: SwitchOrganizationResponse) => void;
  onError?: () => void;
};

export const useSwitchOrganization = ({
  onSuccess,
  onError,
}: UseSwitchOrganization) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Payload) =>
      switchOrganization(data),
    onSuccess: async (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
