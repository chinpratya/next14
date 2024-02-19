import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateSetting = {
  settingId: string;
  data: Record<string, unknown>;
};

export const updateSetting = ({
  data,
  settingId,
}: UpdateSetting): Promise<void> => {
  return apiClient.put(
    `/log/setting/${settingId}`,
    data,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
};

type UseUpdateSetting = {
  settingId: string;
  onSuccess?: () => void;
};

export const useUpdateSetting = ({
  settingId,
  onSuccess,
}: UseUpdateSetting) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateSetting({ settingId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        logQueryKeys.setting.detail,
      ]);
      queryClient.invalidateQueries([
        logQueryKeys.setting.stratum,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
