import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const updateIndiceDetail = async (
  indiceId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/log/indices/${indiceId}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseUpdateIndiceInfoOptions = {
  indiceId: string;
  onSuccess?: () => void;
};

export const useUpdateIndiceDetail = ({
  indiceId,
  onSuccess,
}: UseUpdateIndiceInfoOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateIndiceDetail(indiceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        logQueryKeys.indices.detail(indiceId),
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
