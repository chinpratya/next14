import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateAssessmentSubmissionSettingNotificationPayload =
  {
    isNotification: boolean;
    notifications?: {
      notiType: string;
      notiDt: string;
    }[];
  };

export const updateAssessmentSubmissionSettingNotification =
  (
    assessmentSubmissionId: string,
    payload: UpdateAssessmentSubmissionSettingNotificationPayload
  ) => {
    return apiClient.post(
      `/assignment-submission/${assessmentSubmissionId}/setting/notification`,
      payload,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );
  };

export type UseUpdateAssessmentSubmissionSettingNotification =
  {
    assessmentSubmissionId: string;
    onSuccess?: () => void;
  };

export const useUpdateAssessmentSubmissionSettingNotification =
  ({
    assessmentSubmissionId,
    onSuccess,
  }: UseUpdateAssessmentSubmissionSettingNotification) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (
        payload: UpdateAssessmentSubmissionSettingNotificationPayload
      ) =>
        updateAssessmentSubmissionSettingNotification(
          assessmentSubmissionId,
          payload
        ),
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          complianceQueryKeys.assessmentSubmission.setting(
            assessmentSubmissionId
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
