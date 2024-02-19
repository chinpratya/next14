import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createTemplateRisk = async (
  data: Record<string, unknown>
): Promise<void> =>
  await apiClient.post(`/assessment`, data, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

export type UseCreateTemplateRisk = {
  onSuccess?: () => void;
};

export const useCreateTemplateRisk = ({
  onSuccess,
}: UseCreateTemplateRisk = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createTemplateRisk,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.templateRisk.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
