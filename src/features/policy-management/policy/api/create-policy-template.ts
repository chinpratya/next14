import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { PolicyBuilderSectionSchema } from '@/schema/policy-builder';
import { PolicyBuilderSection } from '@/types/policy-builder';

export const createPolicyTemplate = async (
  data: Record<string, unknown>,
  templateId: string
): Promise<PolicyBuilderSection[]> => {
  const response = await apiClient.post(
    `/policyNotices/wizzard/${templateId}`,
    data,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return z
    .array(PolicyBuilderSectionSchema)
    .parse(response.data);
};

export type UseCreatePolicyTemplate = {
  onSuccess?: (
    policySections: PolicyBuilderSection[]
  ) => void;
  templateId: string;
};

export const useCreatePolicyTemplate = ({
  onSuccess,
  templateId,
}: UseCreatePolicyTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createPolicyTemplate(data, templateId),
    onSuccess: async (policySections) => {
      onSuccess?.(policySections);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
