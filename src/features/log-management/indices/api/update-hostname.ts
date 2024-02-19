import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const updateHostname = async (
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/log/hostname/${data._id}`,
    data,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
};

type UseUpdateHostname = {
  onSuccess?: () => void;
};

export const useUpdateHostname = ({
  onSuccess,
}: UseUpdateHostname) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateHostname(data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        logQueryKeys.hostname.host,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
