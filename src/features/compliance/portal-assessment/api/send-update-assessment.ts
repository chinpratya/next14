import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';

export const sendUpdatePortalAssessment = (
  assessmentId: string,
  reason: string
): Promise<void> =>
  apiClient.post(
    `/portal/assessment-approve/${assessmentId}/send-update`,
    {
      reason,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

export type UseSendUpdatePortalAssessment = {
  assessmentId: string;
  onSuccess?: () => void;
};

export const useSendUpdatePortalAssessment = ({
  assessmentId,
  onSuccess,
}: UseSendUpdatePortalAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (reason: string) =>
      sendUpdatePortalAssessment(assessmentId, reason),
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
