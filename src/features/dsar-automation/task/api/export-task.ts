import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export type ExportTask = Record<string, unknown>;

export const exportTask = async ({
  ...params
}: ExportTask = {}): Promise<string> => {
  const response = await apiClient.get('/work/export', {
    baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    params,
  });

  return z.string().parse(response?.data?.url);
};

export type UseExportTask = Record<string, unknown> & {
  onSuccess?: (url: string) => void;
};

export const useExportTask = ({
  onSuccess,
  ...params
}: UseExportTask) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      exportTask({
        ...params,
      }),
    onSuccess: (url: string) => {
      onSuccess?.(url);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
