import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityBasisPurpose = {
  activityId: string;
  basisId: string;
  purposeId: string[];
};

export const addActivityBasisPurpose = ({
  activityId,
  basisId,
  purposeId,
}: AddActivityBasisPurpose): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/basis/${basisId}/purpose`,
    {
      purposeID: purposeId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityBasisPurpose = {
  activityId: string;
  basisId: string;
  onSuccess?: () => void;
};

export const useAddActivityBasisPurpose = ({
  activityId,
  basisId,
  onSuccess,
}: UseAddActivityBasisPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (purposeId: string[]) =>
      addActivityBasisPurpose({
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
