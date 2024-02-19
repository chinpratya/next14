import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteOrganizationUnitListRespondents = {
  organizationId: string;
  instituteId: string;
  respondentId: string;
};

export const deleteOrganizationUnitListRespondents = ({
  organizationId,
  instituteId,
  respondentId,
}: DeleteOrganizationUnitListRespondents): Promise<void> => {
  return apiClient.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/respondent/${respondentId}`
  );
};

export type UseDeleteOrganizationUnitListRespondents = {
  organizationId: string;
  instituteId: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useDeleteOrganizationUnitListRespondents = ({
  organizationId,
  instituteId,
  page,
  pageSize,
  onSuccess,
}: UseDeleteOrganizationUnitListRespondents) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (respondentId: string) =>
      deleteOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        respondentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.respondent(
          organizationId,
          instituteId,
          page,
          pageSize
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
