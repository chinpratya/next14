import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateDataMappingOrganizations = {
  payload: Record<string, unknown>;
  organizationsId: string;
};
export const updateDataMappingOrganizations = async ({
  payload,
  organizationsId,
}: UpdateDataMappingOrganizations): Promise<void> => {
  return apiClient.put(
    `/entity/${organizationsId}`,
    payload,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseUpdateDataMappingOrganizations = {
  organizationsId: string;
  onSuccess?: () => void;
};

export const useUpdateDataMappingOrganizations = ({
  organizationsId,
  onSuccess,
}: UseUpdateDataMappingOrganizations) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      updateDataMappingOrganizations({
        organizationsId,
        payload,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.organization.detail(
          organizationsId
        ),
      ]);

      await queryClient.invalidateQueries([
        dataMappingQueryKeys.organization.all,
      ]);

      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
