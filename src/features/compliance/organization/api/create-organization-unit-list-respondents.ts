import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { OrganizationUnitRespondentCreate } from '../types';

export const createOrganizationUnitListRespondents = (
  organizationId: string,
  instituteId: string,
  data: OrganizationUnitRespondentCreate[]
): Promise<void> => {
  return apiClient.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/respondent`,
    { data }
  );
};

export type UseCreateOrganizationUnitListRespondents = {
  organizationId: string;
  instituteId: string;
  onSuccess?: () => void;
};

export const useCreateOrganizationUnitListRespondents = ({
  organizationId,
  instituteId,
  onSuccess,
}: UseCreateOrganizationUnitListRespondents) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (
      data: OrganizationUnitRespondentCreate[]
    ) =>
      createOrganizationUnitListRespondents(
        organizationId,
        instituteId,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
