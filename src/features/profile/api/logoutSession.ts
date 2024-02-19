import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const logoutSession = async (
  sessionId: string
): Promise<void> => {
  await apiClient.delete(
    `/user/auth/session/${sessionId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
};

type UseLogoutSession = {
  onSuccess?: () => void;
};

export const useLogoutSession = ({
  onSuccess,
}: UseLogoutSession) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: logoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries([
        profileQueryKeys.session.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
