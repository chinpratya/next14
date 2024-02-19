import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export type UpdatePortalAssessment = {
  assessmentId: string;
  form: Array<Record<string, unknown>>;
};

export const updatePortalAssessment = ({
  assessmentId,
  form,
}: UpdatePortalAssessment): Promise<void> =>
  apiClient.post(
    `/portal/assessment/${assessmentId}/save`,
    {
      form,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

type UseUpdatePortalAssessment = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useUpdatePortalAssessment = ({
  assessmentId,
  onSuccess,
}: UseUpdatePortalAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (form: Array<Record<string, unknown>>) =>
      updatePortalAssessment({ assessmentId, form }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        compliancePortalQueryKeys.assessment.detail(
          assessmentId
        ),
      ]);
      onSuccess?.();
    },
  });
  return {
    submit: mutate,
    isLoading,
  };
};
