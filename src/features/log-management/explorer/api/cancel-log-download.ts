import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const cancelLogDownload = (
  logId: string
): Promise<void> => {
  return apiClient.put(
    `/log/download/${logId}/cancel`,
    undefined,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
};

type UseCancelLogDownload = {
  onSuccess?: () => void;
};

export const useCancelLogDownload = ({
  onSuccess,
}: UseCancelLogDownload) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: cancelLogDownload,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.download.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
