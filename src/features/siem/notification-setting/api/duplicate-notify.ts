import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const duplicateNotify = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<void> => {
  return apiClient.post(
    `/core/notify/duplicate/${id}`,
    { name },
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseDuplicateNotify = {
  onSuccess?: () => void;
};

export const useDuplicateNotify = ({
  onSuccess,
}: UseDuplicateNotify) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: duplicateNotify,
    onSuccess: () => {
      queryClient.invalidateQueries([
        coreQueryKeys.notify.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
