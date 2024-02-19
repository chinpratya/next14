import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

type UpdateAliasHost = {
  data: Record<string, unknown>;
  hostId: string;
};

export const updateAliasHost = async ({
  data,
  hostId,
}: UpdateAliasHost): Promise<void> => {
  return await apiClient.put(
    `/log/hostname/${hostId}/host`,
    data,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
};

type UseUpdateAliasHost = {
  hostId: string;
  onSuccess?: () => void;
};

export const useUpdateAliasHost = ({
  hostId,
  onSuccess,
}: UseUpdateAliasHost) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateAliasHost({ data, hostId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.hostname.host,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
