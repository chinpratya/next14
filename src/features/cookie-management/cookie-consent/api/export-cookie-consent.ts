import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export type ExportCookieConsent = Record<string, unknown>;

export const exportCookieConsent = async ({
  ...params
}: ExportCookieConsent = {}): Promise<string> => {
  const response = await apiClient.get(
    '/cookieconsent/export',
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
      params,
    }
  );

  return z.string().parse(response?.data?.url);
};

export type UseExportCookieConsent = Record<
  string,
  unknown
> & {
  onSuccess?: (url: string) => void;
};

export const useExportCookieConsent = ({
  onSuccess,
  ...params
}: UseExportCookieConsent) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      exportCookieConsent({
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
