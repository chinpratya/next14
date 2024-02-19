import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type RemoveActivityBasisPurpose = {
  activityId: string;
  basisId: string;
  purposeId: string;
};

export const removeActivityBasisPurpose = ({
  activityId,
  basisId,
  purposeId,
}: RemoveActivityBasisPurpose): Promise<void> =>
  apiClient.delete(
    `/activity/${activityId}/basis/${basisId}/purpose/${purposeId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseRemoveActivityBasisPurpose = {
  activityId: string;
  basisId: string;
  onSuccess?: () => void;
};

export const useRemoveActivityBasisPurpose = ({
  activityId,
  basisId,
  onSuccess,
}: UseRemoveActivityBasisPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (purposeId: string) =>
      removeActivityBasisPurpose({
        activityId,
        basisId,
        purposeId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.basisPurpose(
          activityId,
          basisId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
