import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const logForward = async (
  indiceId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/log/indices/forward/${indiceId}`,
    data,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
};

type UseLogForward = {
  indiceId: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useLogForward = ({
  indiceId,
  onSuccess,
}: UseLogForward) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      logForward(indiceId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.indices.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
