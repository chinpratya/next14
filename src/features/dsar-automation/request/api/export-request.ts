import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export type ExportRequest = Record<string, unknown>;

export const exportRequest = async ({
  ...params
}: ExportRequest = {}): Promise<string> => {
  const response = await apiClient.get(
    '/request/export',
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      params,
    }
  );

  return z.string().parse(response?.data?.url);
};

export type UseExportRequest = Record<string, unknown> & {
  onSuccess?: (url: string) => void;
};

export const useExportRequest = ({
  onSuccess,
  ...params
}: UseExportRequest) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      exportRequest({
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
