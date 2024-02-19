import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type updateJobTitleProps = {
  positionId: string;
  data: Record<string, unknown>;
};
export const updateJobTitle = async ({
  data,
  positionId,
}: updateJobTitleProps): Promise<void> => {
  return apiClient.put(
    `/user/org/position/${positionId}`,
    data,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
};

export type UseUpdatePosition = {
  positionId: string;
  onSuccess?: () => void;
};

export const useUpdateJobTitle = ({
  positionId,
  onSuccess,
}: UseUpdatePosition) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: updateJobTitle,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.jobTitle.detail(positionId),
      ]);
      await queryClient.invalidateQueries([
        adminQueryKeys.jobTitle.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
