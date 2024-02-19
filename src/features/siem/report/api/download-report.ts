import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';

import { ReportPayload } from '../types';

export const downloadReport = async (
  payload: ReportPayload
): Promise<void> => {
  await apiClient.post(`/core/report`, payload, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseDownloadReport = {
  onSuccess?: () => void;
};

export const useDownloadReport = ({
  onSuccess,
}: UseDownloadReport) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: downloadReport,
    onSuccess: async () => {
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
