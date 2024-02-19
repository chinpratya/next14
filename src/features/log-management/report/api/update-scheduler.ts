import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateScheduler = async (
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/core/report_scheduler/${data._id}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseUpdateScheduler = {
  onSuccess?: () => void;
};

export const useUpdateScheduler = ({
  onSuccess,
}: UseUpdateScheduler) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: updateScheduler,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        coreQueryKeys.reportScheduler.all('LM'),
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
