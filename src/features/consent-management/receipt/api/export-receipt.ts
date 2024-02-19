import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export type ExportReceipt = Record<string, unknown>;

export const exportReceipt = async ({
  ...params
}: ExportReceipt = {}): Promise<string> => {
  const response = await apiClient.get(
    '/receipt/export',
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      params,
    }
  );

  return z.string().parse(response?.data?.url);
};

export type UseExportReceipt = Record<string, unknown> & {
  onSuccess?: (url: string) => void;
};

export const useExportReceipt = ({
  onSuccess,
  ...params
}: UseExportReceipt) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      exportReceipt({
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
