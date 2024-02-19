import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateNotify = async (
  data: Record<string, unknown>,
  notifyId: string
): Promise<void> => {
  return await apiClient.put(
    `/core/notify/${notifyId}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseUpdateNotify = {
  notifyId: string;
  onSuccess?: () => void;
};

export const useUpdateNotify = ({
  notifyId,
  onSuccess,
}: UseUpdateNotify) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateNotify(data, notifyId),
    onSuccess: () => {
      queryClient.invalidateQueries([
        coreQueryKeys.notify.detail(notifyId),
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
