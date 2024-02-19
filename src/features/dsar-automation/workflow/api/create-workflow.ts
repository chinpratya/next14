import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createWorkFlow = async (
  data: Record<string, unknown>
): Promise<{
  ObjectUUID: string;
}> => {
  const response = await apiClient.post(
    `/workflow`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return z
    .object({
      ObjectUUID: z.string(),
    })
    .parse(response.data);
};

export type UseCreateWorkFlow = {
  onSuccess?: (data: { ObjectUUID: string }) => void;
};

export const useCreateWorkFlow = ({
  onSuccess,
}: UseCreateWorkFlow) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createWorkFlow,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.workflow.all,
      ]);
      onSuccess?.(data);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
