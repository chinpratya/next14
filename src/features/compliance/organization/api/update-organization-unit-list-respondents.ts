import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrganizationUnitRespondent } from '../types';

export type UpdateOrganizationUnitListRespondents = {
  organizationId: string;
  instituteId: string;
  data: OrganizationUnitRespondent;
};

export const updateOrganizationUnitListRespondents = ({
  organizationId,
  instituteId,
  data,
}: UpdateOrganizationUnitListRespondents): Promise<void> => {
  return apiClient.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/respondent/${data.ObjectUUID}`,
    data
  );
};

export type UseUpdateOrganizationUnitListRespondents = {
  organizationId: string;
  instituteId: string;
  respondentId: string;
  onSuccess?: () => void;
};

export const useUpdateOrganizationUnitListRespondents = ({
  organizationId,
  instituteId,
  respondentId,
  onSuccess,
}: UseUpdateOrganizationUnitListRespondents) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: OrganizationUnitRespondent) =>
      updateOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.detailRespondent(
          organizationId,
          instituteId,
          respondentId
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
