import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createAssessmentOfActivity = (
  data: Record<string, unknown>
) =>
  apiClient.post('/riskassessmentactivity', data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseCreateAssessmentOfActivity = {
  activityIds: string[];
  onSuccess?: () => void;
};

export const useCreateAssessmentOfActivity = ({
  activityIds,
  onSuccess,
}: UseCreateAssessmentOfActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createAssessmentOfActivity({
        ...data,
        activityID: activityIds,
      }),
    onSuccess: async () => {
      activityIds.forEach((activityId) => {
        queryClient.resetQueries([
          riskAssessmentQueryKeys.activity.assessment(
            activityId
          ),
        ]);
      });
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.activity.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
