import { useMutation } from '@tanstack/react-query';
import z from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createWebform = async (
  data: Record<string, unknown>
): Promise<string> => {
  const response = await apiClient.post(
    `/webfrom`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return z.string().parse(response.data.webformID);
};

export type UseCreateWebform = {
  onSuccess?: (webformId: string) => void;
};

export const useCreateWebform = ({
  onSuccess,
}: UseCreateWebform) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createWebform,
    onSuccess: async (webformId: string) => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.all,
      ]);
      onSuccess?.(webformId);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
