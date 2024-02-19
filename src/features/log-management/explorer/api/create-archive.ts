import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createArchive = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/archive`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateArchive = {
  path: string;
  onSuccess?: () => void;
};

export const useCreateArchive = ({
  path,
  onSuccess,
}: UseCreateArchive) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createArchive,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.directory.all(path),
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
