import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updatePurpose = async (
  purposeId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/purpose/${purposeId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseUpdatePurpose = {
  purposeId: string;
  onSuccess?: () => void;
};

export const useUpdatePurpose = ({
  purposeId,
  onSuccess,
}: UseUpdatePurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updatePurpose(purposeId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.purpose.all,
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.purpose.detail(purposeId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
