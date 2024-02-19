import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export type ExportTransaction = Record<string, unknown>;

export const exportTransaction = async ({
  ...params
}: ExportTransaction = {}): Promise<string> => {
  const response = await apiClient.get(
    '/transaction/export',
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      params,
    }
  );

  return z.string().parse(response?.data?.url);
};

export type UseExportTransaction = Record<
  string,
  unknown
> & {
  onSuccess?: (url: string) => void;
};

export const useExportTransaction = ({
  onSuccess,
  ...params
}: UseExportTransaction) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      exportTransaction({
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
